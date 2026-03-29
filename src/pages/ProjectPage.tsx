import PageHeader from "../components/PageHeader";
import { createProject, fetchProjects } from "../services/ProjectService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProjectStatus, type Project, type ProjectModalValues } from "../types/Project";
import ProjectCard from "../components/ProjectCard";
import { Grid, Loader } from "@mantine/core";
import ProjectModal from "../components/ProjectModal";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

function ProjectPage() {
  const { data, isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const queryClient = useQueryClient();
  const [newProjectOpened, { open: openNewProject, close: closeNewProject }] = useDisclosure(false);
 
  const form = useForm<ProjectModalValues>({
    initialValues: {
      name: '',
      description: '',
      dueDate: null,
      phase: '',
      progress: 0,
      status: ProjectStatus.ON_TRACK,
    },
    validate: {
      name: (value) => (value ? null : "Project name is required"),
      description: (value) => (value ? null : "Project description is required"),
      dueDate: (value) => (value ? null : "Due date is required"),
      phase: (value) => (value ? null : "Current phase is required"),
      progress: (value) => {
        if (value === undefined || value === null) {
          return "Progress is required";
        }
        if (Number.isNaN(value)) {
          return "Progress must be a number";
        }
        if (value < 0 || value > 100) {
          return "Progress must be between 0 and 100";
        }
        return null;
      },
      status: (value) => (value ? null : "Status is required"),
    },
  });

  const resetCreateForm = () => {
    form.reset();
    form.clearErrors();
  };

  const handleCreateClose = () => {
    resetCreateForm();
    closeNewProject();
  };

  const { mutate: createProjectMutate } = useMutation({
    mutationFn: createProject,
    onSuccess: (createdProject: Project) => {
      queryClient.setQueryData(["projects"], (old: Project[] | undefined) => [
        ...(old ?? []),
        createdProject,
      ]);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      handleCreateClose();
    },
  });

  const createSubmitHandler = form.onSubmit((values) => {
    createProjectMutate(values);
  });

  return (
    <>
      <ProjectModal
        onSubmit={createSubmitHandler}
        opened={newProjectOpened}
        onClose={handleCreateClose}
        form={form}
      />
      <div>
        <PageHeader
          title="Project Overview"
          text="Personal space for your size projects and indie builds"
          buttonProps={{ label: "New Project", onClick: openNewProject }}
        />
        {isLoading ? (
          <Loader size="xl" color="blue" variant="dots" />
        ) : (
          <Grid>
            {data?.map((project) => (
              <Grid.Col span={3} key={project.id}>
                <ProjectCard project={project} />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}

export default ProjectPage;
