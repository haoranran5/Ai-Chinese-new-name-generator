import ActivateOrderForm from "./ActivateOrderForm";

export default async function ActivateOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const params = await searchParams;
  const orderId = params?.orderId || "";

  if (!orderId) {
    return <div className="p-8 text-red-500">OrderId is required.</div>;
  }

  return <ActivateOrderForm orderId={orderId} />;
}
