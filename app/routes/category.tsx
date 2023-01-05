import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Table } from "flowbite-react";

import type {
  ActionArgs,
  ActionFunction,
  LoaderFunction,
} from "@remix-run/node";

import type {
  Category as ICategory,
  CategoryType as ICategoryType,
} from "@prisma/client";

import { prisma } from "~/utils/prisma.server";
import Layout from "~/components/layout";

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
  const { categories } = useLoaderData();

  return (
    <Layout>
      <Outlet />

      <div className="flex justify-end">
        <Button onClick={() => navigate("/category/new")}>Adicionar</Button>
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
    </Layout>
  );
}
