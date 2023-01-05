import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import { Form } from "@remix-run/react";
import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { Button, Label, Modal, TextInput } from "flowbite-react";

import { prisma } from "~/utils/prisma.server";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const description = formData.get("description");

  await prisma.categoryType.create({
    data: {
      description: String(description),
    },
  });

  return redirect("/category/new");
};

export default function CategoryType() {
  const navigate = useNavigate();
  const [visible] = useState(true);

  const handleToogle = () => navigate("/category/new");

  return (
    <Modal show={visible} position="top-center" onClose={handleToogle}>
      <Form method="post">
        <Modal.Header>Cadastrar Tipo de Categoria</Modal.Header>
        <Modal.Body>
          <Label htmlFor="description" value="Descrição" />
          <TextInput id="description" name="description" required />
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button type="submit">Salvar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
