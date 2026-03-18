import React from "react";
import PageHeader from "../components/PageHeader";
import { fetchProjects } from "../services/ProjectService";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "../types/Project";
import ProjectCard from "../components/ProjectCard";
import { Grid } from "@mantine/core";

function ProjectPage() {
  const { data } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <div>
      <PageHeader
        title="Project Overview"
        text="Personal space for your size projects and indie builds"
        buttonProps={{ label: "New Project", onClick: () => {} }}
      />
        <Grid>
          {data?.map((project) => (
            <Grid.Col span={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid.Col>
          ))}
        </Grid>
    </div>
  );
}

export default ProjectPage;
