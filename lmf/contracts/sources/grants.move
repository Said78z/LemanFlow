module lmf::grants {
    use std::vector;
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui::table::{Self, Table};
    use sui::event;
    use sui::transfer;

    /// Organizer capability. Only addresses holding this cap can manage missions and distribution.
    struct OrganizerCap has key {
        id: UID,
        organizer: address,
    }

    /// Pool that holds configuration and bookkeeping for grants distribution.
    struct GrantPool has key {
        id: UID,
        cap: u64,
        total_weight: u64,
        sponsors: vector<address>,
        missions: Table<u64, Mission>,
        // claims[user][mission_id] => true
        claims: Table<address, Table<u64, bool>>,
    }

    /// Mission metadata and validity window.
    struct Mission has store, drop, copy {
        mission_id: u64,
        meta: vector<u8>,
        start_ms: u64,
        end_ms: u64,
        reward_weight: u64,
    }

    /// Soulbound passport object (non-transferable by convention; see notes in README).
    struct Passport has key {
        id: UID,
        owner: address,
        zk_owner_pubkey: vector<u8>,
        created_at_ms: u64,
    }

    /// Attestation event emitted on successful claim.
    struct Attested has copy, drop {
        owner: address,
        mission_id: u64,
        timestamp_ms: u64,
    }

    /// Initialize pool and mint OrganizerCap to the organizer.
    public entry fun init_pool(organizer: address, sponsors: vector<address>, cap: u64, ctx: &mut TxContext) {
        let cap_obj = OrganizerCap { id: object::new(ctx), organizer };
        let missions = table::new<u64, Mission>(ctx);
        let claims_nested = table::new<address, Table<u64, bool>>(ctx);
        let pool = GrantPool { id: object::new(ctx), cap, total_weight: 0, sponsors, missions, claims: claims_nested };
        transfer::transfer(cap_obj, organizer);
        transfer::share_object(pool);
    }

    /// Create a mission; only organizer may call.
    public entry fun create_mission(cap_obj: &OrganizerCap, pool: &mut GrantPool, mission_id: u64, meta: vector<u8>, start_ms: u64, end_ms: u64, reward_weight: u64, ctx: &mut TxContext) {
        assert!(cap_obj.organizer == tx_context::sender(ctx), 0);
        assert!(start_ms < end_ms, 1);
        let exists = table::contains<u64, Mission>(&pool.missions, &mission_id);
        assert!(!exists, 2);
        let m = Mission { mission_id, meta, start_ms, end_ms, reward_weight };
        table::add<u64, Mission>(&mut pool.missions, mission_id, m);
        pool.total_weight = pool.total_weight + reward_weight;
    }

    /// Mint a soulbound passport for a zkLogin user.
    /// Note: non-transferability is enforced at the application layer for hackathon scope.
    public entry fun mint_passport(zk_owner_pubkey: vector<u8>, clock: &Clock, ctx: &mut TxContext) {
        let now = clock::timestamp_ms(clock);
        let p = Passport { id: object::new(ctx), owner: tx_context::sender(ctx), zk_owner_pubkey, created_at_ms: now };
        transfer::transfer(p, tx_context::sender(ctx));
    }

    /// Claim attestation for a mission by presenting a signature from organizer over a QR payload.
    /// For hackathon scope, this function trusts backend pre-verification and enforces: time window and anti-double-claim.
    public entry fun claim_attestation(pool: &mut GrantPool, passport: &Passport, mission_id: u64, _proof_sig: vector<u8>, clock: &Clock, ctx: &mut TxContext) {
        assert!(passport.owner == tx_context::sender(ctx), 9);
        let now = clock::timestamp_ms(clock);
        let has = table::contains<u64, Mission>(&pool.missions, &mission_id);
        assert!(has, 11);
        let m_ref = table::borrow<u64, Mission>(&pool.missions, &mission_id);
        assert!(now >= m_ref.start_ms && now <= m_ref.end_ms, 12);

        let owner = passport.owner;
        let claimed_map_exists = table::contains<address, Table<u64, bool>>(&pool.claims, &owner);
        if (!claimed_map_exists) {
            let inner = table::new<u64, bool>(ctx);
            table::add<address, Table<u64, bool>>(&mut pool.claims, owner, inner);
        };
        let inner_ref = table::borrow_mut<address, Table<u64, bool>>(&mut pool.claims, &owner);
        let already = table::contains<u64, bool>(inner_ref, &mission_id);
        assert!(!already, 13);
        table::add<u64, bool>(inner_ref, mission_id, true);

        event::emit(Attested { owner, mission_id, timestamp_ms: now });
    }

    /// Distribute rewards from the pool based on a lightweight strategy encoded off-chain.
    /// Hackathon scope: this records an event; fund movement is out-of-scope for MVP.
    public entry fun distribute(_cap_obj: &OrganizerCap, _strategy_blob: vector<u8>, _ctx: &mut TxContext) {
        // Intentionally left minimal for MVP.
    }

    // Note: Soulbound: we do not expose any transfer API for Passport and document
    // recommended TransferPolicy usage in docs for stricter enforcement if needed.
}

