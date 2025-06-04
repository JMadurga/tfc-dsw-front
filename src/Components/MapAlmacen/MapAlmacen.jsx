import { useState } from "react";
import { EstSelected } from "../EstSelected/EstSelected";

export const MapAlmacen = () => {
  const [seleccionado, setSeleccionado] = useState(null);

  const botones = [

    { id: "Vino Tinto", col: 1, row: 1 },
    { id: "Vino Blanco", col: 2, row: 1 },
    { id: "Miel", col: 3, row: 1 },
    { id: "Aceites", col: 4, row: 1 },
    { id: "Conservas", col: 5, row: 1 },
    { id: "Embutidos", col: 1, row: 2 },
    { id: "Vino Rosado", col: 1, row: 4 },
    { id: "Quesos", col: 2, row: 4 },
    { id: "Estanteria Vacia ", col: 3, row: 4 },
    { id: "Estanteria Vacia  ", col: 4, row: 4 },
    { id: "Estanteria Vacia   ", col: 6, row: 4 },
  ];

  return (
    <div className="flex flex-col items-center w-full h-full px-4 py-10">
      <div className="grid grid-cols-6 grid-rows-4 gap-10 bg-cyan-200 px-24 py-20 rounded-lg min-w-[500px] w-full ">
        {botones.map((btn, index) => {
          const isVertical = btn.id === "Embutidos" ;

          return (
            <button
              key={index}
              onClick={() => setSeleccionado(btn.id)}
              style={{
                      gridColumnStart: btn.col,
                      gridRowStart: btn.row,
                      gridRowEnd: isVertical ? `span 2` : undefined,
                      width: isVertical ? '80px' : '100%',
                      height: isVertical ? '100%' : '80px',
                    }}
              className={`text-white rounded flex items-center justify-center
                ${isVertical? "writing-mode-vertical-lr  text-xs" : "w-full h-20"}
                ${seleccionado === btn.id ? "bg-blue-500" : "bg-neutral-700"}`}
            >
              {btn.id}
            </button>
          );
        })}


      </div>

      <div className="py-5 mb-12">
        {seleccionado && <EstSelected nombre={seleccionado} />}
      </div>
    </div>
  );
};
