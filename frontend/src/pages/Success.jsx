import { useParams } from "react-router-dom";

export default function Success() {
  const { id } = useParams();

  return (
    <div>
      <h1>Order Placed Successfully 🎉</h1>
      <h2>Order ID: {id}</h2>
    </div>
  );
}