(window.webpackJsonp=window.webpackJsonp||[]).push([[137],{706:function(e,t,a){"use strict";a.r(t);var o=a(1),i=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"adr-077-configurable-block-retention"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adr-077-configurable-block-retention"}},[e._v("#")]),e._v(" ADR 077: Configurable Block Retention")]),e._v(" "),a("h2",{attrs:{id:"changelog"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),a("ul",[a("li",[e._v("2020-03-23: Initial draft (@erikgrinaker)")]),e._v(" "),a("li",[e._v("2020-03-25: Use local config for snapshot interval (@erikgrinaker)")]),e._v(" "),a("li",[e._v("2020-03-31: Use ABCI commit response for block retention hint")]),e._v(" "),a("li",[e._v("2020-04-02: Resolved open questions")]),e._v(" "),a("li",[e._v("2021-02-11: Migrate to tendermint repo (Originally "),a("a",{attrs:{href:"https://github.com/tendermint/spec/pull/84",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC 001"),a("OutboundLink")],1),e._v(")")])]),e._v(" "),a("h2",{attrs:{id:"author-s"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#author-s"}},[e._v("#")]),e._v(" Author(s)")]),e._v(" "),a("ul",[a("li",[e._v("Erik Grinaker (@erikgrinaker)")])]),e._v(" "),a("h2",{attrs:{id:"context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),a("p",[e._v("Currently, all Tendermint nodes contain the complete sequence of blocks from genesis up to some height (typically the latest chain height). This will no longer be true when the following features are released:")]),e._v(" "),a("ul",[a("li",[a("p",[a("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/3652",target:"_blank",rel:"noopener noreferrer"}},[e._v("Block pruning"),a("OutboundLink")],1),e._v(": removes historical blocks and associated data (e.g. validator sets) up to some height, keeping only the most recent blocks.")])]),e._v(" "),a("li",[a("p",[a("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/828",target:"_blank",rel:"noopener noreferrer"}},[e._v("State sync"),a("OutboundLink")],1),e._v(": bootstraps a new node by syncing state machine snapshots at a given height, but not historical blocks and associated data.")])])]),e._v(" "),a("p",[e._v("To maintain the integrity of the chain, the use of these features must be coordinated such that necessary historical blocks will not become unavailable or lost forever. In particular:")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Some nodes should have complete block histories, for auditability, querying, and bootstrapping.")])]),e._v(" "),a("li",[a("p",[e._v("The majority of nodes should retain blocks longer than the Cosmos SDK unbonding period, for light client verification.")])]),e._v(" "),a("li",[a("p",[e._v("Some nodes must take and serve state sync snapshots with snapshot intervals less than the block retention periods, to allow new nodes to state sync and then replay blocks to catch up.")])]),e._v(" "),a("li",[a("p",[e._v("Applications may not persist their state on commit, and require block replay on restart.")])]),e._v(" "),a("li",[a("p",[e._v("Only a minority of nodes can be state synced within the unbonding period, for light client verification and to serve block histories for catch-up.")])])]),e._v(" "),a("p",[e._v("However, it is unclear if and how we should enforce this. It may not be possible to technically enforce all of these without knowing the state of the entire network, but it may also be unrealistic to expect this to be enforced entirely through social coordination. This is especially unfortunate since the consequences of misconfiguration can be permanent chain-wide data loss.")]),e._v(" "),a("h2",{attrs:{id:"proposal"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#proposal"}},[e._v("#")]),e._v(" Proposal")]),e._v(" "),a("p",[e._v("Add a new field "),a("code",[e._v("retain_height")]),e._v(" to the ABCI "),a("code",[e._v("ResponseCommit")]),e._v(" message:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"proto",base64:"c2VydmljZSBBQkNJQXBwbGljYXRpb24gewogIHJwYyBDb21taXQoUmVxdWVzdENvbW1pdCkgcmV0dXJucyAoUmVzcG9uc2VDb21taXQpOwp9CgptZXNzYWdlIFJlcXVlc3RDb21taXQge30KCm1lc3NhZ2UgUmVzcG9uc2VDb21taXQgewogIC8vIHJlc2VydmUgMQogIGJ5dGVzICBkYXRhICAgICAgICAgID0gMjsgLy8gdGhlIE1lcmtsZSByb290IGhhc2gKICB1aW50NjQgcmV0YWluX2hlaWdodCA9IDM7IC8vIHRoZSBvbGRlc3QgYmxvY2sgaGVpZ2h0IHRvIHJldGFpbgp9Cg=="}}),e._v(" "),a("p",[e._v("Upon ABCI "),a("code",[e._v("Commit")]),e._v(", which finalizes execution of a block in the state machine, Tendermint removes all data for heights lower than "),a("code",[e._v("retain_height")]),e._v(". This allows the state machine to control block retention, which is preferable since only it can determine the significance of historical blocks. By default (i.e. with "),a("code",[e._v("retain_height=0")]),e._v(") all historical blocks are retained.")]),e._v(" "),a("p",[e._v("Removed data includes not only blocks, but also headers, commit info, consensus params, validator sets, and so on. In the first iteration this will be done synchronously, since the number of heights removed for each run is assumed to be small (often 1) in the typical case. It can be made asynchronous at a later time if this is shown to be necessary.")]),e._v(" "),a("p",[e._v("Since "),a("code",[e._v("retain_height")]),e._v(" is dynamic, it is possible for it to refer to a height which has already been removed. For example, commit at height 100 may return "),a("code",[e._v("retain_height=90")]),e._v(" while commit at height 101 may return "),a("code",[e._v("retain_height=80")]),e._v(". This is allowed, and will be ignored - it is the application's responsibility to return appropriate values.")]),e._v(" "),a("p",[e._v("State sync will eventually support backfilling heights, via e.g. a snapshot metadata field "),a("code",[e._v("backfill_height")]),e._v(", but in the initial version it will have a fully truncated block history.")]),e._v(" "),a("h2",{attrs:{id:"cosmos-sdk-example"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cosmos-sdk-example"}},[e._v("#")]),e._v(" Cosmos SDK Example")]),e._v(" "),a("p",[e._v("As an example, we'll consider how the Cosmos SDK might make use of this. The specific details should be discussed in a separate SDK proposal.")]),e._v(" "),a("p",[e._v("The returned "),a("code",[e._v("retain_height")]),e._v(" would be the lowest height that satisfies:")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Unbonding time: the time interval in which validators can be economically punished for misbehavior. Blocks in this interval must be auditable e.g. by the light client.")])]),e._v(" "),a("li",[a("p",[e._v("IAVL snapshot interval: the block interval at which the underlying IAVL database is persisted to disk, e.g. every 10000 heights. Blocks since the last IAVL snapshot must be available for replay on application restart.")])]),e._v(" "),a("li",[a("p",[e._v("State sync snapshots: blocks since the "),a("em",[e._v("oldest")]),e._v(" available snapshot must be available for state sync nodes to catch up (oldest because a node may be restoring an old snapshot while a new snapshot was taken).")])]),e._v(" "),a("li",[a("p",[e._v("Local config: archive nodes may want to retain more or all blocks, e.g. via a local config option "),a("code",[e._v("min-retain-blocks")]),e._v(". There may also be a need to vary rentention for other nodes, e.g. sentry nodes which do not need historical blocks.")])])]),e._v(" "),a("p",[a("img",{attrs:{src:"img/block-retention.png",alt:"Cosmos SDK block retention diagram"}})]),e._v(" "),a("h2",{attrs:{id:"status"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),a("p",[e._v("Accepted")]),e._v(" "),a("h2",{attrs:{id:"consequences"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),a("h3",{attrs:{id:"positive"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Application-specified block retention allows the application to take all relevant factors into account and prevent necessary blocks from being accidentally removed.")])]),e._v(" "),a("li",[a("p",[e._v("Node operators can independently decide whether they want to provide complete block histories (if local configuration for this is provided) and snapshots.")])])]),e._v(" "),a("h3",{attrs:{id:"negative"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Social coordination is required to run archival nodes, failure to do so may lead to permanent loss of historical blocks.")])]),e._v(" "),a("li",[a("p",[e._v("Social coordination is required to run snapshot nodes, failure to do so may lead to inability to run state sync, and inability to bootstrap new nodes at all if no archival nodes are online.")])])]),e._v(" "),a("h3",{attrs:{id:"neutral"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Reduced block retention requires application changes, and cannot be controlled directly in Tendermint.")])]),e._v(" "),a("li",[a("p",[e._v("Application-specified block retention may set a lower bound on disk space requirements for all nodes.")])])]),e._v(" "),a("h2",{attrs:{id:"references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("State sync ADR: "),a("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/docs/architecture/adr-053-state-sync-prototype.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/tendermint/tendermint/blob/master/docs/architecture/adr-053-state-sync-prototype.md"),a("OutboundLink")],1)])]),e._v(" "),a("li",[a("p",[e._v("State sync issue: "),a("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/828",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/tendermint/tendermint/issues/828"),a("OutboundLink")],1)])]),e._v(" "),a("li",[a("p",[e._v("Block pruning issue: "),a("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/3652",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/tendermint/tendermint/issues/3652"),a("OutboundLink")],1)])])])],1)}),[],!1,null,null,null);t.default=i.exports}}]);