import { useState, useCallback, ChangeEvent, useEffect } from "react";
import chroma from "chroma-js";

const App = () => {
  const [color, setColor] = useState("#000000");
  const [count, setCount] = useState(3);
  const [tints, setTints] = useState<string[]>([]);
  const [tones, setTones] = useState<string[]>([]);
  const [shades, setShades] = useState<string[]>([]);

  const onChangeColor = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setColor(e.target.value),
    []
  );

  const onClickRandomColor = useCallback(() => {
    setColor(chroma.random().hex());
  }, []);

  const onChangeCount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value)),
    []
  );

  useEffect(() => {
    setTints(chroma.scale([color, "#FFFFFF"]).colors(count));
    setTones(chroma.scale([color, "#808080"]).colors(count));
    setShades(chroma.scale([color, "#000000"]).colors(count));
  }, [color, count]);

  return (
    <div className="flex flex-col w-screen gap-4 p-4 items-center">
      <div className="flex gap-4">
        <input
          type="color"
          className="w-96 h-48"
          value={color}
          onChange={onChangeColor}
        />
        <div className="flex flex-col gap-4">
          <h1>{color}</h1>
          <button onClick={onClickRandomColor}>Random</button>
          <div className="flex gap-4">
            <input
              type="range"
              value={count}
              onChange={onChangeCount}
              min={3}
              max={36}
            />
            <div>{count}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        <h1>Tints</h1>
        <div className="grid grid-cols-12 gap-4">
          {tints.map((tint) => (
            <div
              className="w-full h-10 text-black content-center text-center"
              style={{ backgroundColor: tint }}
            >
              {tint}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        <h1>Tones</h1>
        <div className="grid grid-cols-12 gap-4">
          {tones.map((tone) => (
            <div
              className="w-full h-10 text-white content-center text-center"
              style={{ backgroundColor: tone }}
            >
              {tone}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        <h1>Shades</h1>
        <div className="grid grid-cols-12 gap-4">
          {shades.map((shade) => (
            <div
              className="w-full h-10 text-white content-center text-center"
              style={{ backgroundColor: shade }}
            >
              {shade}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
