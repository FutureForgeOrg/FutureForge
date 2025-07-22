import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkelatonModel() {
  return (
    <div style={{ padding: "2rem", display: "flex", gap: "2rem" }}>
      {/* Sidebar */}
      <div style={{ width: "250px" }}>
        <Skeleton height={40} width={`100%`} style={{ marginBottom: "1rem" }} />
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} height={30} width={`100%`} style={{ marginBottom: "0.75rem" }} />
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {/* Page title */}
        <Skeleton height={40} width={400} style={{ marginBottom: "1.5rem" }} />

        {/* Cards or section blocks */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton height={200} width="100%" />
              <Skeleton height={20} width="80%" style={{ marginTop: "0.5rem" }} />
              <Skeleton height={20} width="60%" />
            </div>
          ))}
        </div>

        {/* Table-like or text rows */}
        <div style={{ marginTop: "2rem" }}>
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              height={30}
              width="100%"
              style={{ marginBottom: "0.75rem" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkelatonModel;
