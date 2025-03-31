import React from "react";
import { useRouter } from "next/router";
import Header from "../../components/header";

const ComponentSelection = () => {
  const router = useRouter();

  const handleComponentClick = (componentType) => {
    router.push(`/components/${componentType}`);
  };

  return (
    <div>
      <Header />
      <h2 id="title">Components</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}
      >
        <div>
          <button onClick={() => handleComponentClick("../component_parts/cpus")}>
            <img
              src="/imgs/components/processors.webp"
              alt="Processors"
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>Processors</p>
        </div>
        <div>
          <button onClick={() => handleComponentClick("../component_parts/gpus")}>
            <img
              src="/imgs/components/graphics.webp"
              alt="Graphics Cards"
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>Graphics Cards</p>
        </div>
        <div>
          <button onClick={() => handleComponentClick("../component_parts/motherboards")}>
            <img
              src="/imgs/components/motherboards.webp"
              alt="Motherboards"
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>Motherboards</p>
        </div>
        <div>
          <button onClick={() => handleComponentClick("../component_parts/rams")}>
            <img
              src="/imgs/components/memory.webp"
              alt="Memory"
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>Memory</p>
        </div>
        <div>
          <button onClick={() => handleComponentClick("../component_parts/storage")}>
            <img
              src="/imgs/components/storage.webp"
              alt="Storage"
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>Storage</p>
        </div>
        <div>
          <button onClick={() => handleComponentClick("../component_parts/power")}>
            <img
              src="/imgs/components/power.webp"
              alt="Power Supplies"
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>Power Supplies</p>
        </div>
        <div>
          <button onClick={() => handleComponentClick("../component_parts/cases")}>
            <img
              src="/imgs/components/cases.webp"
              alt="Cases"
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>Cases</p>
        </div>
        <div>
          <button onClick={() => handleComponentClick("../component_parts/cooling")}>
            <img
              src="/imgs/components/cooling.webp"
              alt="Cooling"
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>Cooling</p>
        </div>
        <div>
          <button onClick={() => handleComponentClick("../component_parts/fans")}>
            <img
              src="/imgs/components/fans.webp"
              alt="Fans"
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>Fans</p>
        </div>
      </div>
    </div>
  );
};

export default ComponentSelection;
