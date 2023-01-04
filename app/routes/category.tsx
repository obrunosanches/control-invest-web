import type {
  ActionArgs,
  ActionFunction,
  LoaderFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Label, TextInput, Select, Table, Card } from "flowbite-react";

import type {
  Category as ICategory,
  CategoryType as ICategoryType,
} from "@prisma/client";

import { prisma } from "~/utils/prisma.server";

interface ICategoryWithType extends ICategory {
  type: ICategoryType;
}

export const loader: LoaderFunction = async () => {
  const categoryTypes = await prisma.categoryType.findMany();
  const categories = await prisma.category.findMany({
    include: {
      type: true,
    },
  });

  return json({ categories, categoryTypes });
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

export default function Category() {
  const navigate = useNavigate();
  const { categories, categoryTypes } = useLoaderData();

  return (
    <div className="px-5 mt-5">
      <Outlet />

      <div className="flex justify-between items-center">
        <h1 className="text-xl">Categorias</h1>
        <Link to="/">Voltar</Link>
      </div>

      <div className="flex justify-center mt-5">
        <Card className="w-full max-w-md">
          <Form method="post">
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
              <Button onClick={() => navigate("/category/type")}>Tipo</Button>
            </div>
            <Button type="submit" className="mt-4">
              Salvar
            </Button>
          </Form>
        </Card>
      </div>

      <div className="overflow-x-auto relative mt-6">
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Descrição</Table.HeadCell>
            <Table.HeadCell>Tipo</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {categories.map((item: ICategoryWithType) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.type.description}</Table.Cell>
                <Table.Cell>
                  <div className="flex">
                    <Link to="">
                      <PencilSquareIcon height={18} />
                    </Link>
                    <span className="px-2">|</span>
                    <Link to="">
                      <TrashIcon height={18} />
                    </Link>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
