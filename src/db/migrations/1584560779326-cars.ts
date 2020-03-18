import {MigrationInterface, QueryRunner} from "typeorm";

export class cars1584560779326 implements MigrationInterface {
    name = 'cars1584560779326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "manufacurer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(60) NOT NULL, "phone" character varying NOT NULL, "siret" bigint NOT NULL DEFAULT 0, CONSTRAINT "PK_f4f5a2495c56c1da81ce417369c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstRegistrationDate" TIMESTAMP NOT NULL DEFAULT now(), "price" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "owner" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "purchaseDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(60) NOT NULL, "carId" uuid, CONSTRAINT "REL_732957c1d4ade78a38331490d7" UNIQUE ("carId"), CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "owner" ADD CONSTRAINT "FK_732957c1d4ade78a38331490d76" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owner" DROP CONSTRAINT "FK_732957c1d4ade78a38331490d76"`, undefined);
        await queryRunner.query(`DROP TABLE "owner"`, undefined);
        await queryRunner.query(`DROP TABLE "car"`, undefined);
        await queryRunner.query(`DROP TABLE "manufacurer"`, undefined);
    }

}
