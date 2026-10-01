import { supabase } from "../lib/supabaseClient";

export type Experience = {
  id?: string;
  period: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  link?: string;
  sort_order?: number;
};

export async function getExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from("experiences")
    .select(`
      id,
      period,
      role,
      company,
      description,
      link,
      sort_order,
      experience_skills (
        skills (
          id,
          name
        )
      )
    `)
    .order("sort_order", { ascending: true });

  if (error) {
    throw error;
  }

  return data.map((experience) => ({
    ...experience,
    link: experience.link ?? undefined,
    skills: experience.experience_skills.flatMap((item) => {
      const skillRelation = item.skills as { name: string } | { name: string }[];
      const skillName = Array.isArray(skillRelation)
        ? skillRelation[0]?.name
        : skillRelation.name;

      return skillName ? [skillName] : [];
    }),
  })) as Experience[];
}


export type Project = {
  id?: string;
    title: string;
    description: string;
    link?: string;
    sort_order?: number;
    skills: string[];
};


export async function getPortfolioData() {
  const [experiences, projects] = await Promise.all([
    getExperiences(),
    getProjects(),
  ]);

  return {
    experiences,
    projects,
  };
}

export type Star = {
  id?: string;
    top: string;
    left: string;
    delay: string;
    duration: string;
};

export async function getStars(): Promise<Star[]> {
    const { data, error } = await supabase
        .from("stars")
        .select(`
            id,
            top_position,
            left_position,
            delay,
            duration,
            sort_order
        `)
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("Supabase stars error:", error);
        throw error;
    }

    return (data ?? []).map((star: any) => ({
        id: star.id,
        top: star.top_position,
        left: star.left_position,
        delay: star.delay,
        duration: star.duration,
    }));
}

export async function getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
        .from("projects")
        .select("id, title, description, link, sort_order")
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("Supabase projects error:", error);
        throw error;
    }

    return (data ?? []).map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        link: project.link ?? undefined,
        sort_order: project.sort_order,
        skills: [],
    }));
}