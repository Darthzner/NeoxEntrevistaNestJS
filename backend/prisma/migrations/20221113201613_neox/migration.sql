-- CreateTable
CREATE TABLE "users" (
    "secret_code" VARCHAR,
    "is_activate" BOOLEAN NOT NULL DEFAULT true,
    "rol_id" INTEGER NOT NULL,
    "user_id" VARCHAR NOT NULL,
    "user_name" VARCHAR NOT NULL,
    "user_password" VARCHAR NOT NULL,

    CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "rol_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "fk_rol_id" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

INSERT INTO roles (rol_name)
values ('ADMIN'), ('STANDARD')