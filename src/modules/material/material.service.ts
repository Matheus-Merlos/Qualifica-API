import { Injectable } from '@nestjs/common';
import { eq, InferSelectModel } from 'drizzle-orm';
import db from 'src/db';
import { material as materialModel } from 'src/db/schema';
import { CreateMaterialDto, UpdateMaterialDto } from './dto/material.dto';

@Injectable()
export class MaterialService {
  async create(owner: number, createMaterialDto: CreateMaterialDto) {
    let material: InferSelectModel<typeof materialModel>;
    try {
      [material] = await db
        .insert(materialModel)
        .values({
          owner: owner,
          url: createMaterialDto.url,
          name: createMaterialDto.name,
          description: createMaterialDto.description,
        })
        .returning();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    return material!;
  }

  findAllByOwner(owner: number) {
    return db
      .select()
      .from(materialModel)
      .where(eq(materialModel.owner, owner));
  }

  findOne(id: number) {
    return db
      .select()
      .from(materialModel)
      .where(eq(materialModel.id, id))
      .limit(1);
  }

  async update(
    id: number,
    owner: number,
    updateMaterialDto: UpdateMaterialDto,
  ) {
    let material: InferSelectModel<typeof materialModel>;
    try {
      const dataToUpdate = {
        ...updateMaterialDto,
        owner: owner,
      };
      [material] = await db
        .update(materialModel)
        .set(dataToUpdate)
        .where(eq(materialModel.id, id))
        .returning();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    return material!;
  }

  async remove(id: number) {
    try {
      await db.delete(materialModel).where(eq(materialModel.id, id));
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
}
