import DashboardLayout from "@/app/components/layout/Dashboard";
import { prisma } from "@/server/db";
import Link from "next/link";

export default async function Dashboard() {
    const data = await prisma.course.findMany({});
    return (
        <DashboardLayout>
            <div className="flex flex-wrap gap-5 justify-center">
                {data?.map((course) => (
                    <Link key={course.id} href={`/dashboard/course/${course.id}`}>
                        <div className="card w-96 shadow-xl hover:bg-gray-100">
                            <figure><img src={course.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {course.name}
                                    <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <DescriptionWithTruncation
                                    description={course.description}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </DashboardLayout>
    );
}

// Extract the description rendering into a separate component
function DescriptionWithTruncation({ description }: { description: string }) {
    const length = 150
    const truncatedDescription = description.length > length
        ? `${description.slice(0, length)}...`
        : description;

    return <p>{truncatedDescription}</p>;
}