import { isRequestByAdmin, requireAuth, ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const draftSchema = z.object({
  data: z.string({ error: "دیتا الزامی است" }),

  step: z.number().int().min(1, "مرحله نامعتبر است").optional(),

  saveType: z.enum(["AUTO", "MANUAL"]).optional(),
  status: z.enum(["DRAFT", "SUBMITTED", "EXPIRED"]).optional(),
  version: z.number().optional(),
  productId: z.string().nullable().optional(),
});

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const { session } = await requireAuth();

    // Ensure user is authenticated and has a valid ID
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const result = draftSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.format().data?._errors },
        { status: 400 }
      );
    }

    const {
      data: draftData,
      saveType,
      step,
      status,
      version,
      productId,
    } = result.data;

    const userDraft = await prisma.productDraft.findFirst({
      where: {
        userId,
      },
    });

    let resolvedDraft = {};

    if (!userDraft) {
      const newDraft = await prisma.productDraft.create({
        data: {
          data: JSON.parse(draftData),
          userId,
          saveType,
          step,
          status,
          version,
        },
      });
      resolvedDraft = newDraft;
    } else {
      const updateDraft = await prisma.productDraft.update({
        data: {
          data: JSON.parse(draftData),
          saveType,
          step,
          status,
          version,
          productId,
        },
        where: {
          userId,
          id: userDraft.id,
        },
      });
      resolvedDraft = updateDraft;
    }

    return NextResponse.json({
      success: true,
      resolvedDraft,
    });
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
