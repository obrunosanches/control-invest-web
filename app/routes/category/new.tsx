import { useState } from "react";
import { Outlet, redirect, useNavigate } from "react-router";
import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";

import type { CategoryType as ICategoryType } from "@prisma/client";
import type {
  ActionArgs,
  ActionFunction,
  LoaderFunction,
} from "@remix-run/node";

import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async () => {
  const categoryTypes = await prisma.categoryType.findMany();

  return json({ categoryTypes });
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  await prisma.category.create({
    data: {
      name: String(formData.get("name")),
      typeId: String(formData.get("typeId")),
    },
  });

  return redirect("/category");
};

export default function NewCategory() {
  const navigate = useNavigate();
  const [visible] = useState(true);
  const { categoryTypes } = useLoaderData();

  const handleToogle = () => navigate("/category");

  return (
    <>
      <Outlet />

      <Modal show={visible} position="top-center" onClose={handleToogle}>
        <Form method="post">
          <Modal.Header>Cadastrar categoria</Modal.Header>
          <Modal.Body>
            <Label htmlFor="name" value="Descrição" />
            <TextInput id="name" name="name" required />

            <div className="mt-4 flex items-end">
              <div className="flex-auto mr-4">
                <Label htmlFor="typeId" value="Tipo" />
                <Select id="typeId" name="typeId" required>
                  <option value="">Selecione o tipo</option>
                  {categoryTypes.map((item: ICategoryType) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.description}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <Button onClick={() => navigate("/category/new/type")}>
                Tipo
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button type="submit">Salvar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
