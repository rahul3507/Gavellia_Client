import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  const product = products.find(
    (p) =>
      p.id === decodedId ||
      p.title.toLowerCase().replace(/\s+/g, "-") === decodedId.toLowerCase()
  );

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 10);

  return NextResponse.json({
    product,
    relatedProducts,
  });
}
