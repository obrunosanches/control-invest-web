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
import { Button, Label, TextInput, Select } from "flowbite-react";

import type {
  Category as ICategory,
  CategoryType as ICategoryType,
} from "@prisma/client";

import { prisma } from "~/utils/prisma.server";

interface ICategoryWithType extends ICategory {
  type: ICategoryType;
}

export const loader: LoaderFunction = async () => {
  const category = await prisma.category.findMany({
    include: {
      type: true,
    },
  });

  const categoryTypes = await prisma.categoryType.findMany();

  return json({ category, categoryTypes });
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const typeId = formData.get("typeId");

  await prisma.category.create({
    data: {
      name: String(name),
      typeId: String(typeId),
    },
  });

  return redirect("/category");
};

export default function Category() {
  const navigate = useNavigate();
  const { category, categoryTypes } = useLoaderData();

  return (
    <div className="px-5 mt-5">
      <Outlet />

      <div className="flex justify-between items-center">
        <h1 className="text-xl">Categorias</h1>
        <Link to="/">Voltar</Link>
      </div>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
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
            <div className="flex justify-end mt-4">
              <Button type="submit">Salvar</Button>
            </div>
          </Form>
        </div>
      </div>

      <div className="overflow-x-auto relative mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Descrição
              </th>
              <th scope="col" className="py-3 px-6">
                Tipo
              </th>
              <th scope="col" className="py-3 px-6">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {category.map((item: ICategoryWithType) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{item.name}</td>
                  <td className="py-4 px-6">{item.type.description}</td>
                  <td className="py-4 px-6" colSpan={2}>
                    <div className="flex">
                      <PencilSquareIcon height={18} />
                      <TrashIcon height={18} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
