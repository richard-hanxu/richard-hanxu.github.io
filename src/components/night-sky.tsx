/** Fixed positions keep server/client markup identical, with no animation JavaScript. */
export function NightSky() {
  return (
    <div className="night-sky" aria-hidden="true">
      {Array.from({ length: 32 }, (_, index) => (
        <span
          key={index}
          className="night-star"
          style={{
            left: `${3 + ((index * 37) % 94)}%`,
            top: `${2 + ((index * 23) % 96)}%`,
            width: index % 4 === 0 ? 3 : 2,
            height: index % 4 === 0 ? 3 : 2,
            color: ["#c9ddff", "#ded0ff", "#a9dcd8", "#fff0d4"][index % 4],
            animationDuration: `${5 + (index % 5)}s`,
            animationDelay: `${-index * 1.7}s`,
          }}
        />
      ))}
      <span className="night-comet night-comet-one" />
      <span className="night-comet night-comet-two" />
      <span className="night-comet night-comet-three" />
      <span className="night-comet night-comet-four" />
      <span className="night-comet night-comet-five" />
      <span className="night-comet night-comet-six" />
    </div>
  );
}
