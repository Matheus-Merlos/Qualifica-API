import { Injectable } from '@nestjs/common';
import { eq, InferSelectModel } from 'drizzle-orm';
import db from 'src/db';
import { material as materialModel } from 'src/db/schema';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  async create(courseSection: number, createMaterialDto: CreateMaterialDto) {
    let material: InferSelectModel<typeof materialModel>;
    try {
      [material] = await db
        .insert(materialModel)
        .values({
          courseSection,
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

  findAllBySection(sectionId: number) {
    return db
      .select()
      .from(materialModel)
      .where(eq(materialModel.courseSection, sectionId));
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
    sectionId: number,
    updateMaterialDto: UpdateMaterialDto,
  ) {
    let material: InferSelectModel<typeof materialModel>;
    try {
      const dataToUpdate = {
        ...updateMaterialDto, // Espalha as propriedades do DTO (name, url, description, etc.)
        courseSection: sectionId,
        //updatedAt: new Date(), // <-- CORREÇÃO: Use 'updatedAt' e atribua diretamente
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
