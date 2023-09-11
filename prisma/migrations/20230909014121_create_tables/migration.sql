-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "controle_acesso";

-- CreateTable
CREATE TABLE "controle_acesso"."modulo" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "icone" VARCHAR(45) NOT NULL,
    "administrador" BOOLEAN NOT NULL DEFAULT false,
    "url" VARCHAR(30),
    "descricao" VARCHAR(200),
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "ordem" SMALLINT NOT NULL,
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),
    "deletado_em" TIMESTAMP(6),
    "criado_por" UUID,
    "atualizado_por" UUID,

    CONSTRAINT "modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controle_acesso"."submodulo" (
    "id" UUID NOT NULL,
    "modulo_id" UUID NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "icone" VARCHAR(45) NOT NULL,
    "url" VARCHAR NOT NULL,
    "menu" BOOLEAN NOT NULL DEFAULT false,
    "descricao" VARCHAR(255),
    "ordem" INTEGER,
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),
    "deletado_em" TIMESTAMP(6),
    "criado_por" UUID,
    "atualizado_por" UUID,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "submodulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controle_acesso"."perfil" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "identificador" VARCHAR(20) NOT NULL,
    "administrador" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),
    "deletado_em" TIMESTAMP(6),
    "criado_por" UUID,
    "atualizado_por" UUID,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controle_acesso"."operacao" (
    "id" UUID NOT NULL,
    "submodulo_id" UUID NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "identificador" VARCHAR(50) NOT NULL,
    "url" VARCHAR(50),
    "icone" VARCHAR(45),
    "pagina" BOOLEAN NOT NULL DEFAULT false,
    "descricao" VARCHAR(200),
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),
    "deletado_em" TIMESTAMP(6),
    "criado_por" UUID,
    "atualizado_por" UUID,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "operacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controle_acesso"."perfil_operacao" (
    "perfil_id" UUID NOT NULL,
    "operacao_id" UUID NOT NULL,
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletado_em" TIMESTAMP(6),
    "criado_por" UUID
);

-- CreateTable
CREATE TABLE "controle_acesso"."usuario_perfil" (
    "usuario_id" UUID NOT NULL,
    "perfil_id" UUID NOT NULL,
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletado_em" TIMESTAMP(6),
    "criado_por" UUID,

    CONSTRAINT "usuario_perfil_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "controle_acesso"."usuario" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" VARCHAR(15) NOT NULL,
    "senha" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),
    "deletado_em" TIMESTAMP(6),
    "criado_por" UUID,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controle_acesso"."refresh_token" (
    "id" UUID NOT NULL,
    "usuario_id" UUID,
    "expires_in" INTEGER NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "modulo_nome_key" ON "controle_acesso"."modulo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "modulo_url_key" ON "controle_acesso"."modulo"("url");

-- CreateIndex
CREATE UNIQUE INDEX "modulo_ordem_key" ON "controle_acesso"."modulo"("ordem");

-- CreateIndex
CREATE UNIQUE INDEX "submodulo_modulo_icone_un" ON "controle_acesso"."submodulo"("icone", "modulo_id");

-- CreateIndex
CREATE UNIQUE INDEX "submodulo_modulo_nome_un" ON "controle_acesso"."submodulo"("modulo_id", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "submodulo_modulo_ordem_un" ON "controle_acesso"."submodulo"("modulo_id", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "submodulo_modulo_url_un" ON "controle_acesso"."submodulo"("modulo_id", "url");

-- CreateIndex
CREATE UNIQUE INDEX "perfil_nome_key" ON "controle_acesso"."perfil"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "perfil_identificador_key" ON "controle_acesso"."perfil"("identificador");

-- CreateIndex
CREATE UNIQUE INDEX "operacao_submodulo_identificador_un" ON "controle_acesso"."operacao"("submodulo_id", "identificador");

-- CreateIndex
CREATE UNIQUE INDEX "operacao_submodulo_nome_un" ON "controle_acesso"."operacao"("submodulo_id", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "operacao_submodulo_url_un" ON "controle_acesso"."operacao"("submodulo_id", "url");

-- CreateIndex
CREATE UNIQUE INDEX "perfil_operacao_un" ON "controle_acesso"."perfil_operacao"("perfil_id", "operacao_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_perfil_un" ON "controle_acesso"."usuario_perfil"("usuario_id", "perfil_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "controle_acesso"."usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_key" ON "controle_acesso"."usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_usuario_id_key" ON "controle_acesso"."refresh_token"("usuario_id");

-- AddForeignKey
ALTER TABLE "controle_acesso"."submodulo" ADD CONSTRAINT "submodulo_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "controle_acesso"."modulo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "controle_acesso"."operacao" ADD CONSTRAINT "operacao_submodulo_id_fkey" FOREIGN KEY ("submodulo_id") REFERENCES "controle_acesso"."submodulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controle_acesso"."perfil_operacao" ADD CONSTRAINT "perfil_operacao_operacao_id_fkey" FOREIGN KEY ("operacao_id") REFERENCES "controle_acesso"."operacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "controle_acesso"."perfil_operacao" ADD CONSTRAINT "perfil_operacao_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "controle_acesso"."perfil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "controle_acesso"."usuario_perfil" ADD CONSTRAINT "usuario_perfil_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "controle_acesso"."perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controle_acesso"."usuario_perfil" ADD CONSTRAINT "usuario_perfil_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "controle_acesso"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controle_acesso"."refresh_token" ADD CONSTRAINT "refresh_token_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "controle_acesso"."usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
