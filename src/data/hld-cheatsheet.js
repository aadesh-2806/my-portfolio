window.HLD_CHEAT_SHEET_PAGES = [
  {
    title: "Scalability",
    intro:
      "The ability of a system to maintain performance as users, requests, and data grow. Common paths are vertical scaling, horizontal scaling, and diagonal scaling.",
    sections: [
      {
        title: "How it works",
        items: [
          "Make app servers stateless and push state to durable stores such as databases, caches, and object storage.",
          "Place a load balancer in front, add instances, and autoscale on metrics such as CPU, QPS, and p95 latency.",
          "Use back-pressure with queues, idempotent handlers, and retries with jitter.",
        ],
      },
      {
        title: "Metrics",
        items: ["Throughput, latency percentiles, error rate, saturation, and cost per request."],
      },
    ],
    realWorld: "Instagram uses sharded Redis for feed fan-out, Kafka for async processing, and Kubernetes HPA to scale pods.",
    interviewTip:
      "Say that you will first scale stateless app servers behind a load balancer, externalize state, introduce caching, and use SLO-based autoscaling alerts.",
    diagram: "assets/study/hld/diagrams/hld-diagram-01.png",
  },
  {
    title: "Availability",
    intro:
      "The fraction of time the system is up. Availability equals uptime divided by uptime plus downtime, and it is improved through redundancy, isolation, detection, and automated recovery.",
    sections: [
      {
        title: "How it works",
        items: [
          "Replicate across zones or regions with health checks and failover.",
          "Keep services stateless where possible so they restart and roll quickly.",
          "Gracefully degrade by serving cached or partial responses during incidents.",
        ],
      },
      {
        title: "Strategies",
        items: ["Multi-AZ or multi-region deployment, blue-green and canary releases, SLOs/SLIs, and chaos engineering."],
      },
    ],
    realWorld: "Route 53 and global load balancers can shift traffic away from unhealthy regions; cell architecture reduces blast radius.",
    interviewTip: "Mention graceful degradation, retry budgets, and blast-radius control.",
  },
  {
    title: "Latency vs Throughput",
    intro:
      "Latency is time per request, while throughput is requests per unit time. Tail latency such as p95 and p99 usually drives user experience more than averages.",
    sections: [
      {
        title: "How it works",
        items: [
          "Queueing increases latency as utilization approaches 100%.",
          "Batching improves throughput but can hurt p99 latency.",
          "Shorten the critical path and move non-critical work to async flows.",
        ],
      },
      {
        title: "Techniques",
        items: ["CDNs, hot caches, hedged requests, request collapsing, and async I/O."],
      },
    ],
    realWorld: "Google uses hedged RPCs to reduce p99; streaming reduces head-of-line blocking for large responses.",
    interviewTip: "Speak in percentiles, and call out queueing and concurrency limits explicitly.",
    diagram: "assets/study/hld/diagrams/hld-diagram-03.png",
  },
  {
    title: "CAP Theorem",
    intro:
      "During a network partition, a distributed system must choose between consistency and availability. PACELC adds the normal-case tradeoff: if there is no partition, choose between latency and consistency.",
    sections: [
      {
        title: "How it works",
        items: [
          "CP systems often use leaders, quorum reads/writes, and strong correctness guarantees.",
          "AP systems often use multi-leader writes, read repair, CRDTs, and eventual consistency.",
          "Cross-region synchronous replication increases latency; async replication increases staleness.",
        ],
      },
      {
        title: "Challenge",
        items: ["Choosing the wrong guarantee for the domain, such as treating payments like social timelines."],
      },
    ],
    realWorld: "Payments usually need CP-style correctness; social feeds and search often tolerate eventual consistency.",
    interviewTip: "State CP or AP per operation and justify the choice through user impact and SLA expectations.",
    diagram: "assets/study/hld/diagrams/hld-diagram-04.png",
  },
  {
    title: "Load Balancers",
    intro:
      "Load balancers distribute traffic, terminate TLS, health-check backends, and route by host, path, or headers.",
    sections: [
      {
        title: "How it works",
        items: [
          "A client reaches the load balancer, which forwards to a healthy backend using L4 or L7 routing.",
          "Outlier detection and active/passive health checks remove unhealthy instances.",
          "Sticky sessions can be used when necessary, but statelessness is usually preferred.",
        ],
      },
      {
        title: "Strategies",
        items: ["Global anycast or CDN at the edge, and service mesh such as Envoy/Istio for internal L7 retries, timeouts, and mTLS."],
      },
    ],
    realWorld: "Envoy sidecars implement retries, circuit breaking, and observability in microservices.",
    interviewTip: "Mention graceful drain, health checks, and outlier detection.",
    diagram: "assets/study/hld/diagrams/hld-diagram-05.png",
  },
  {
    title: "Databases",
    intro:
      "Pick data stores by access pattern: relational for ACID and joins, document for flexible schemas, key-value or wide-column for scale, graph for relationships, time-series for metrics, and vector stores for similarity search.",
    sections: [
      {
        title: "How it works",
        items: [
          "Use OLTP systems such as Postgres or MySQL for transactions.",
          "Use OLAP systems such as BigQuery or Snowflake for analytics.",
          "Use NoSQL, vector search, or specialized stores when the workload demands them.",
        ],
      },
      {
        title: "Challenges",
        items: ["Cross-shard joins, global consistency versus latency, schema evolution, and migrations."],
      },
    ],
    realWorld: "An e-commerce platform may use OLTP for orders, Redis for sessions, Elasticsearch for search, BigQuery for analytics, and S3 for archive.",
    interviewTip: "Start from queries and SLAs, then justify each store by access pattern.",
  },
  {
    title: "Content Delivery Network",
    intro:
      "CDNs cache content at edge points of presence to reduce latency and origin load. Modern CDNs also support edge compute, key-value storage, and smart invalidation.",
    sections: [
      {
        title: "How it works",
        items: [
          "The nearest POP serves cached content; on a miss, it fetches from origin and stores the response.",
          "Cache keys should avoid fragmentation by using only necessary headers and cookies.",
          "Invalidate with TTLs, URL/prefix/tag purges, and stale-while-revalidate patterns.",
        ],
      },
      {
        title: "Strategies",
        items: ["Use immutable versioned assets and signed URLs or headers for protected content."],
      },
    ],
    realWorld: "Netflix and YouTube POPs cache video segments while origins handle upload, authorization, and DRM.",
    interviewTip: "Call out cache key design, TTL plus purge, and signed URLs.",
    diagram: "assets/study/hld/diagrams/hld-diagram-07.png",
  },
  {
    title: "Message Queues",
    intro:
      "Message queues decouple producers and consumers, smooth spikes, and enable async processing. Delivery models include at-least-once, at-most-once, and practical exactly-once through idempotency.",
    sections: [
      {
        title: "How it works",
        items: [
          "A producer publishes, a consumer reads and acknowledges, and the broker redelivers on failure.",
          "FIFO or keyed partitions maintain order within a partition; consumer groups scale horizontally.",
          "Dead-letter queues capture poison messages, and backoff with jitter avoids hot retry loops.",
        ],
      },
      {
        title: "Strategies",
        items: ["Kafka for high-throughput streams; SQS or RabbitMQ for task queues and routing."],
      },
    ],
    realWorld: "Order events can be consumed independently by inventory, billing, and notification services.",
    interviewTip: "Pair at-least-once delivery with idempotent consumers and a DLQ.",
    diagram: "assets/study/hld/diagrams/hld-diagram-08.png",
  },
  {
    title: "Rate Limiting",
    intro:
      "Rate limiting protects APIs and ensures fairness by enforcing limits at gateways and services using fast counters and atomic updates.",
    sections: [
      {
        title: "How it works",
        items: [
          "Track counters per key such as IP, user, tenant, or endpoint with expirations.",
          "Allow or deny based on thresholds and return rate-limit headers.",
          "Use hierarchical limits: global, tenant, user, and endpoint.",
        ],
      },
      {
        title: "Strategies",
        items: ["Token bucket, leaky bucket, sliding window log, and sliding window counter."],
      },
    ],
    realWorld: "GitHub exposes remaining quota in headers so clients can self-throttle.",
    interviewTip: "Mention global versus per-tenant limits and multi-region consistency choices.",
    diagram: "assets/study/hld/diagrams/hld-diagram-09.png",
  },
  {
    title: "Database Indexes",
    intro:
      "Indexes such as B-tree, hash, GIN, and GiST speed reads by avoiding full scans, at the cost of storage and write amplification.",
    sections: [
      {
        title: "How it works",
        items: [
          "B-trees support fast range and equality lookups; hash indexes are useful for equality only.",
          "The query planner chooses indexes using selectivity and cost.",
          "Composite indexes follow left-most prefix rules, and covering indexes can satisfy queries without table lookups.",
        ],
      },
      {
        title: "Challenges",
        items: ["Over-indexing slows writes, and stale or skewed stats mislead the planner."],
      },
    ],
    realWorld: "A composite index on user_id and created_at DESC can support efficient recent-order pagination.",
    interviewTip: "Mention covering index and left-most prefix when optimizing reads.",
    diagram: "assets/study/hld/diagrams/hld-diagram-10.png",
  },
  {
    title: "Caching",
    intro:
      "Caching stores hot data in faster layers such as RAM, SSD, browser, CDN, or Redis to reduce latency and backend load.",
    sections: [
      {
        title: "How it works",
        items: [
          "Check cache first; hits return quickly and misses fetch from the source of truth.",
          "Use layers such as browser cache, CDN, app in-process cache, distributed cache, and database page cache.",
          "Set TTLs, invalidate carefully, and collapse concurrent misses to avoid stampedes.",
        ],
      },
      {
        title: "Strategies",
        items: ["Cache-aside, read-through, write-through, write-back, LRU, LFU, TTL, and TinyLFU."],
      },
    ],
    realWorld: "Netflix and YouTube use multi-layer caching for segments, sessions, and metadata.",
    interviewTip: "Say distributed Redis cache with cache-aside, TTL, and request collapsing to prevent a thundering herd.",
    diagram: "assets/study/hld/diagrams/hld-diagram-11.png",
  },
  {
    title: "Consistent Hashing",
    intro:
      "Consistent hashing places keys and nodes on a hash ring so adding or removing nodes remaps only a small fraction of keys. Virtual nodes smooth load.",
    sections: [
      {
        title: "How it works",
        items: [
          "Hash nodes to a ring, hash the key, and walk clockwise to the next node.",
          "Only local key ranges move when membership changes.",
          "Replicate to the next N nodes for high availability and faster recovery.",
        ],
      },
      {
        title: "Challenges",
        items: ["Skew without enough virtual nodes, hot keys, and operational rebalancing."],
      },
    ],
    realWorld: "Cassandra and Dynamo-style systems use consistent hashing plus replication factors across racks or availability zones.",
    interviewTip: "Call out virtual nodes and replication factor explicitly.",
    diagram: "assets/study/hld/diagrams/hld-diagram-12.png",
  },
  {
    title: "Database Sharding",
    intro:
      "Sharding splits large datasets horizontally across shards to increase capacity and write throughput. The shard key should distribute load and support common queries.",
    sections: [
      {
        title: "How it works",
        items: [
          "Shard key routes the request to the right shard through a router or service.",
          "Hash, range, directory, or geo sharding can be chosen based on query patterns and locality.",
          "Resharding often needs backfill and dual-write during cutover.",
        ],
      },
      {
        title: "Challenges",
        items: ["Cross-shard joins and transactions, global secondary indexes, and hotspots."],
      },
    ],
    realWorld: "Twitter sharded user and content data; Spanner offers global transactions with TrueTime at a latency cost.",
    interviewTip: "Tie shard key choice to top queries and uniformity, then explain cross-shard strategies.",
    diagram: "assets/study/hld/diagrams/hld-diagram-13.png",
  },
  {
    title: "Consensus Algorithms",
    intro:
      "Consensus lets replicas agree on a sequence of values despite failures. Raft and Paxos power strongly consistent systems.",
    sections: [
      {
        title: "How it works",
        items: [
          "Leader election chooses a node to coordinate writes.",
          "Log replication commits entries on a majority quorum.",
          "Linearizable reads go through the leader or read-index style mechanisms.",
        ],
      },
      {
        title: "Challenges",
        items: ["High latency across regions, leader hotspots, and timeout tuning."],
      },
    ],
    realWorld: "etcd, ZooKeeper, and Consul provide configuration, coordination, and locks using Raft or Paxos-style protocols.",
    interviewTip: "Use the phrase leader plus quorum plus linearizability for CP systems.",
  },
  {
    title: "Proxy Servers",
    intro:
      "Proxies act as intermediaries for security, performance, and control. Forward proxies sit near clients; reverse proxies sit in front of services.",
    sections: [
      {
        title: "How it works",
        items: [
          "Reverse proxies terminate TLS, authenticate, and route to upstream services.",
          "They can apply WAF rules, rate limits, compression, and header rewrites.",
          "Service meshes add retries, circuit breaking, mTLS, and observability.",
        ],
      },
      {
        title: "Strategies",
        items: ["Path and host routing, canary or blue-green rollout, A/B tests, and egress control with forward proxies."],
      },
    ],
    realWorld: "Cloudflare shields origins as a reverse proxy; Envoy in Istio provides L7 policies and telemetry.",
    interviewTip: "Mention graceful drain and the interaction between timeouts and retries.",
    diagram: "assets/study/hld/diagrams/hld-diagram-15.png",
  },
  {
    title: "Heartbeats",
    intro:
      "Heartbeats are periodic liveness signals used to detect failures quickly without flapping. Separate liveness from readiness.",
    sections: [
      {
        title: "How it works",
        items: [
          "Agents send heartbeats; controllers mark healthy or unhealthy using timeouts.",
          "Suspicion windows and thresholds avoid false positives.",
          "Backoff plus jitter avoids reconnect storms.",
        ],
      },
      {
        title: "Patterns",
        items: ["Push versus pull probes, gossip-based failure detection, and deep health endpoints."],
      },
    ],
    realWorld: "Kubernetes liveness, readiness, and startup probes manage restarts and rollout gates.",
    interviewTip: "Separate liveness and readiness, then tune thresholds to the system latency profile.",
  },
  {
    title: "Checksums",
    intro:
      "Checksums detect corruption or tampering. CRCs are fast for accidental errors, while cryptographic hashes provide stronger integrity.",
    sections: [
      {
        title: "How it works",
        items: [
          "Compute a digest on write and verify on read or across network hops.",
          "Store checksums with metadata and verify end-to-end from origin to client.",
          "Merkle trees verify large objects or streams efficiently.",
        ],
      },
      {
        title: "Strategies",
        items: ["Use HMAC for authenticity, and avoid weak hashes such as MD5 or SHA-1 in new systems."],
      },
    ],
    realWorld: "S3 ETags, package managers, and BitTorrent use checksums or Merkle trees for integrity.",
    interviewTip: "Call out end-to-end integrity and Merkle trees for large data.",
  },
  {
    title: "Service Discovery",
    intro:
      "Service discovery dynamically finds healthy instances as services scale or move. It can use registries, DNS, or service meshes.",
    sections: [
      {
        title: "How it works",
        items: [
          "Instances register and deregister; health checks keep the registry fresh.",
          "Clients can resolve and load-balance directly, or a gateway can resolve and forward.",
          "Watches, streams, and TTLs reduce stale service entries.",
        ],
      },
      {
        title: "Strategies",
        items: ["Client-side discovery for language-specific control, server-side discovery for central policy, and meshes for uniformity and mTLS."],
      },
    ],
    realWorld: "Kubernetes Services, CoreDNS, and Envoy sidecars provide discovery and secure L7 traffic shaping.",
    interviewTip: "State client-side versus server-side discovery preference and explain the trade-offs.",
  },
  {
    title: "Bloom Filters",
    intro:
      "A Bloom filter is a probabilistic membership structure with no false negatives and tunable false positives. It is useful as a fast precheck before expensive lookups.",
    sections: [
      {
        title: "How it works",
        items: [
          "Use a bit array of size m and k hash functions.",
          "Insertion sets k bits; lookup checks those bits.",
          "False positive rate is approximately (1 - e^(-kn/m))^k; optimal k is approximately (m/n) ln 2.",
        ],
      },
      {
        title: "Strategies",
        items: ["Use Counting or Scalable Bloom filters, and consider Cuckoo filters when deletion is required."],
      },
    ],
    realWorld: "Web caches and databases skip origin reads when a Bloom filter says a key is definitely not present.",
    interviewTip: "Quote the false-positive idea and mention Counting Bloom for deletes.",
    diagram: "assets/study/hld/diagrams/hld-diagram-19.png",
  },
  {
    title: "Gossip Protocol",
    intro:
      "Gossip is epidemic dissemination: nodes periodically exchange state with random peers. It converges eventually, tolerates churn, and scales with low coordination.",
    sections: [
      {
        title: "How it works",
        items: [
          "Random peer selection spreads membership or metrics information.",
          "Failure detection uses suspicion timeouts, as in SWIM.",
          "Versioning or vector clocks resolve concurrent updates.",
        ],
      },
      {
        title: "Uses",
        items: ["Membership, config distribution, cache invalidation, and load sharing."],
      },
    ],
    realWorld: "Cassandra and Consul use gossip for liveness and metadata dissemination.",
    interviewTip: "Describe it as probabilistic, eventually consistent membership with SWIM-style failure detection.",
    diagram: "assets/study/hld/diagrams/hld-diagram-20.png",
  },
  {
    title: "Event-Driven Architecture",
    intro:
      "In EDA, systems communicate through events: facts that happened. Publishers emit and subscribers react asynchronously.",
    sections: [
      {
        title: "How it works",
        items: [
          "Services publish domain events to topics or streams.",
          "Consumers build their own state or projections from events.",
          "At-least-once delivery is common, so handle duplicates and order per key.",
        ],
      },
      {
        title: "Strategies",
        items: ["Pub/sub fan-out, append-only streams with offsets, choreography, and orchestration with workflow engines."],
      },
    ],
    realWorld: "OrderCreated can trigger inventory hold, payment authorization, and notifications independently.",
    interviewTip: "Contrast choreography versus orchestration, and mention idempotency, DLQs, and schema registry.",
  },
  {
    title: "CQRS + Event Sourcing",
    intro:
      "CQRS splits write commands from read queries. Event Sourcing stores state as an append-only event log, while read models are projections.",
    sections: [
      {
        title: "How it works",
        items: [
          "Commands validate intent, emit events, and persist to an event store.",
          "Projections subscribe to events and build query-optimized views.",
          "Replay the log to rebuild state or query state at a previous time.",
        ],
      },
      {
        title: "Challenges",
        items: ["Event versioning, projection lag, idempotent projections, and operational complexity."],
      },
    ],
    realWorld: "Finance and order systems use immutable events for auditability, with separate read models for dashboards and search.",
    interviewTip: "Use CQRS and Event Sourcing when auditability matters and read models vary.",
  },
].map((page, index) => ({
  id: `hld-cheatsheet-${String(index + 1).padStart(2, "0")}`,
  ...page,
}));
