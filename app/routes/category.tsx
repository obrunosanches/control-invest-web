import type {
  ActionArgs,
  ActionFunction,
  LoaderFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import type { CategoryType as ICategoryType } from "@prisma/client";

import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async () => {
  const categoryTypes = await prisma.categoryType.findMany();

  return json({ categoryTypes });
};

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

export default function Category() {
  const { categoryTypes } = useLoaderData();

  return (
    <div className="px-5 mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Categorias</h1>
        <Link to="/">Voltar</Link>
      </div>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <Form method="post">
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descrição
              </label>
              <input
                name="description"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Adicionar
              </button>
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
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {categoryTypes.map((item: ICategoryType) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{item.description}</td>
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
