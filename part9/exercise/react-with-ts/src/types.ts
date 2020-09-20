interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDesc extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseWithDesc {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

export interface HeaderProps {
  courseName: string;
}

export interface ContentProps {
  courseParts: Array<CoursePart>;
}

export interface TotalProps {
  courseParts: Array<CoursePart>;
}

export interface PartProps {
  coursePart: CoursePart;
}