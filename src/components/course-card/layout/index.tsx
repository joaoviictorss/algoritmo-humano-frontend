import { Star } from "lucide-react";
import Image from "next/image";
import type React from "react";
import type {
  IDefaultCourseCardLayout,
  IProgressCourseCardLayout,
  ISkeletonCourseCardLayout,
} from "../data";

export const DefaultCourseCard: React.FC<IDefaultCourseCardLayout> = ({
  course,
}) => {
  return (
    <div className="group flex h-full flex-col rounded-lg border border-zinc-200 bg-white transition-all duration-400 hover:shadow">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          alt="Imagem do curso"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          fill
          src={course?.imageUrl || "/placeholder.jpg"}
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1 space-y-3">
          <h3 className="font-semibold text-lg text-zinc-900 leading-tight">
            {course?.title}
          </h3>

          <div>
            <p className="line-clamp-2 h-max text-sm text-zinc-500 leading-relaxed">
              {course?.description}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between border-zinc-200 border-t pt-2">
            <span className="font-medium text-xs text-zinc-500 uppercase tracking-wide">
              Duração: {course?.duration}h
            </span>

            <div className="flex items-center gap-1">
              <span className="font-medium text-sm text-zinc-700">
                {(Math.random() * 4 + 1).toFixed(1)}
              </span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProgressCourseCard: React.FC<IProgressCourseCardLayout> = ({
  course,
}) => {
  const progress = Math.floor(Math.random() * 101); // número inteiro de 0 a 100

  return (
    <div className="group flex h-full flex-col rounded-lg border border-zinc-200 bg-white transition-all duration-400 hover:shadow">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          alt="Imagem do curso"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          fill
          src={course?.imageUrl || "/placeholder.jpg"}
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1 space-y-3">
          <h3 className="font-semibold text-lg text-zinc-900 leading-tight">
            {course?.title}
          </h3>

          <div>
            <p className="line-clamp-2 h-max text-sm text-zinc-500 leading-relaxed">
              {course?.description}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-xs text-zinc-500 uppercase tracking-wide">
                Progresso
              </span>
              <span className="font-semibold text-blue-600 text-xs">
                {progress}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-200">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-zinc-200 border-t pt-2">
            <span className="font-medium text-xs text-zinc-500 uppercase tracking-wide">
              Duração: {course?.duration}h
            </span>

            <div className="flex items-center gap-1">
              <span className="font-medium text-sm text-zinc-700">
                {(Math.random() * 4 + 1).toFixed(1)}
              </span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonCourseCard: React.FC<ISkeletonCourseCardLayout> = () => {
  return (
    <div className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white">
      {/* Image skeleton */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <div className="h-full w-full animate-pulse bg-zinc-200" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1 space-y-3">
          {/* Title skeleton */}
          <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-200" />

          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200" />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between border-zinc-200 border-t pt-2">
            {/* Duration skeleton */}
            <div className="h-3 w-20 animate-pulse rounded bg-zinc-200" />

            {/* Rating skeleton */}
            <div className="flex items-center gap-1">
              <div className="h-4 w-8 animate-pulse rounded bg-zinc-200" />
              <div className="h-4 w-4 animate-pulse rounded bg-zinc-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
