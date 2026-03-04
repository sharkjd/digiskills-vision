import { COURSE_LIST, COMPLETED_COURSES } from "@/data/courses";
import { getCreatorCourses } from "@/data/creator-courses";

const creatorCourseIds = getCreatorCourses("cs").map((course) => course.id);

export const COURSE_ROUTE_IDS = Array.from(
  new Set([
    ...COURSE_LIST.map((course) => course.id),
    ...COMPLETED_COURSES.map((course) => course.id),
    ...creatorCourseIds,
  ])
).sort((a, b) => a - b);
