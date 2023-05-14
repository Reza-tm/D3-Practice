import "./tailwind.css";

function App() {
  return (
    <div className="w-screen h-screen grid place-content-center text-center space-y-5">
      <p>Hello There !</p>
      <div className="flex gap-3">
        <span>Please use storybook version</span>
        <span className="font-mono">$ npm run storybook</span>
      </div>
      <p>TY ❤️</p>
    </div>
  );
}

export default App;
