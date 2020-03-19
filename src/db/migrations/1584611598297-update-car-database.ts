import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCarDatabase1584611598297 implements MigrationInterface {
    name = 'updateCarDatabase1584611598297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "manufacturer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(60) NOT NULL, "phone" character varying NOT NULL, "siret" bigint NOT NULL DEFAULT 0, CONSTRAINT "PK_81fc5abca8ed2f6edc79b375eeb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstRegistrationDate" TIMESTAMP NOT NULL DEFAULT now(), "model" character varying(50) NOT NULL, "price" integer NOT NULL DEFAULT 0, "manufacturerId" uuid, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "owner" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "purchaseDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(60) NOT NULL, "carId" uuid, CONSTRAINT "REL_732957c1d4ade78a38331490d7" UNIQUE ("carId"), CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_219df163feb468a934c3a7b24ca" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "owner" ADD CONSTRAINT "FK_732957c1d4ade78a38331490d76" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owner" DROP CONSTRAINT "FK_732957c1d4ade78a38331490d76"`, undefined);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_219df163feb468a934c3a7b24ca"`, undefined);
        await queryRunner.query(`DROP TABLE "owner"`, undefined);
        await queryRunner.query(`DROP TABLE "car"`, undefined);
        await queryRunner.query(`DROP TABLE "manufacturer"`, undefined);
    }

}
