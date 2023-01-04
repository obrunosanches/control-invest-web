import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import { Form } from "@remix-run/react";
import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { Button, Label, Modal, TextInput } from "flowbite-react";

import { prisma } from "~/utils/prisma.server";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const categoryData = Object.fromEntries(formData);

  await prisma.categoryType.create({
    data: {
      description: String(categoryData.description),
    },
  });

  return redirect("/category");
};

export default function CategoryType() {
  const navigate = useNavigate();
  const [visible] = useState(true);

  const handleToogle = () => navigate("/category");

  return (
    <Modal show={visible} onClose={handleToogle}>
      <Form method="post">
        <Modal.Header>Tipo de Categoria</Modal.Header>
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
