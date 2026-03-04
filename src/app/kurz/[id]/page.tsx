import CourseDetailPageClient from "@/components/courses/CourseDetailPageClient";
import { COURSE_ROUTE_IDS } from "@/data/course-route-ids";

export const dynamicParams = false;

export function generateStaticParams() {
  return COURSE_ROUTE_IDS.map((courseId) => ({ id: String(courseId) }));
}

export default function CourseDetailPage() {
  return <CourseDetailPageClient />;
}
