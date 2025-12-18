import z from "zod";
import { isRequestByAdmin } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const carModelSchema = z.object({
  name: z.string().min(1, "نام مدل اجباری است"),
  slug: z.string().min(1, "slug اجباری است"),
  year: z.number().int().optional(),
  engineType: z.string().optional(),
  carBrandId: z.string().min(1, "برند خودرو اجباری است"),
});

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const body = await request.json();
    const data = carModelSchema.parse(body);

    const carModel = await prisma.carModel.create({
      data: {
        name: data.name,
        slug: data.slug,
        year: data.year,
        engineType: data.engineType,
        carBrand: {
          connect: { id: data.carBrandId },
        },
      },
    });

    return NextResponse.json(carModel, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Server error" },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const brandId = searchParams.get("brandId");
    const slug = searchParams.get("slug");

    const carModels = await prisma.carModel.findMany({
      where: {
        ...(brandId && { carBrandId: brandId }),
        ...(slug && { slug }),
      },
      include: {
        carBrand: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(carModels);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch car models" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const body = await request.json();
    const { id, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const { carBrandId, engineType, name, slug, year } = carModelSchema
      .partial()
      .parse(rest);

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (year !== undefined) updateData.year = year;
    if (engineType !== undefined) updateData.engineType = engineType;
    if (carBrandId !== undefined)
      updateData.carBrand = { connect: { id: carBrandId } };

    const updated = await prisma.carModel.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Update failed" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.carModel.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
