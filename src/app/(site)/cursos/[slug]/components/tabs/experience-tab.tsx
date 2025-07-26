interface ExperienceItemProps {
  title: string;
  company: string;
  description: string;
  period: string;
}

function ExperienceItem({
  title,
  company,
  description,
  period,
}: ExperienceItemProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="font-medium text-sm">
          {title} - {company}
        </p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      <span className="text-muted-foreground text-xs">{period}</span>
    </div>
  );
}

interface AuthorStatsProps {
  courses: string;
  students: string;
  rating: string;
}

const AuthorStats = ({ courses, students, rating }: AuthorStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 border-t pt-4">
      <div className="text-center">
        <p className="font-semibold text-lg">{courses}</p>
        <p className="text-muted-foreground text-xs">Cursos</p>
      </div>
      <div className="text-center">
        <p className="font-semibold text-lg">{students}</p>
        <p className="text-muted-foreground text-xs">Alunos</p>
      </div>
      <div className="text-center">
        <p className="font-semibold text-lg">{rating}</p>
        <p className="text-muted-foreground text-xs">Avaliação</p>
      </div>
    </div>
  );
};

// Componente para tab Autor
interface AuthorTabProps {
  author: {
    name: string;
    title: string;
    bio: string;
    initials: string;
    experiences: Array<{
      title: string;
      company: string;
      description: string;
      period: string;
    }>;
    stats: {
      courses: string;
      students: string;
      rating: string;
    };
  };
}

export const AuthorTab = ({ author }: AuthorTabProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-lg border bg-white p-4">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <span className="font-semibold text-xl">{author.initials}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{author.name}</h3>
          <p className="font-medium text-primary text-sm">{author.title}</p>
          <p className="mt-2 text-muted-foreground text-sm">{author.bio}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold">Experiência</h4>
        <div className="space-y-2">
          {author.experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} />
          ))}
        </div>
      </div>

      <AuthorStats {...author.stats} />
    </div>
  );
};
