import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // Extract base64 data (remove data URL prefix if present)
    const base64Data = image.includes(",") ? image.split(",")[1] : image;

    const apiKey = process.env.ROBOFLOW_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Call Roboflow API for ingredient detection
    const response = await fetch(
      `https://detect.roboflow.com/ingredient-detection-5uzov/5?api_key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: base64Data,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to detect ingredients");
    }

    const data = await response.json();

    // Extract unique ingredient names from predictions
    const ingredients = [...new Set(
      data.predictions?.map((prediction: { class: string }) =>
        prediction.class.toLowerCase()
      ) || []
    )];

    return NextResponse.json({ ingredients });
  } catch (error) {
    console.error("Detection error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
