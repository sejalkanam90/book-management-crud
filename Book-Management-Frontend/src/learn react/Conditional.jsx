export default function Conditional() {
  const isLoggedIn = true;

  return isLoggedIn ? <Success /> : <Failure />;
}

function Success() {
  return <h1 className="bg-amber-400">Login Successfully</h1>;
}

function Failure() {
  const mystyle = { color: "red" };

  return <h1 style={mystyle}>Login Failed</h1>;
}
