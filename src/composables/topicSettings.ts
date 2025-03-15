export default [
  // Essential Fields (Always Visible)
  { label: "Topic Name", model: "topicName", type: "text", essential: true },
  { label: "Number of Partitions", model: "numPartitions", type: "number", essential: true },
  { label: "Replication Factor", model: "replicationFactor", type: "number", essential: true },

  // Advanced Fields (Inside Expansion Panel)
  { label: "Retention Time (ms)", model: "retention.ms", type: "number", essential: false },
  { label: "Retention Size (bytes)", model: "retention.bytes", type: "number", essential: false },
  { label: "Cleanup Policy", model: "cleanup.policy", type: "select", essential: false, options: ["delete", "compact"] },
  { label: "Compression Type", model: "compression.type", type: "select", essential: false, options: ["none", "gzip", "snappy", "lz4", "zstd"] },
  { label: "Max Message Size (bytes)", model: "max.message.bytes", type: "number", essential: false }
];
