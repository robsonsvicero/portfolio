import React from 'react';
import Card from '../UI/Card';

const ProjectsSection = ({ projects }) => {
  return (
    <section id="projetos" className="bg-low-dark py-24 px-4 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="font-title text-4xl md:text-5xl font-light text-cream mb-4">
            Projetos Selecionados
          </h2>
        </div>
        
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-8 min-h-[2000px]">
            {projects.map((project, index) => (
              <Card
                key={index}
                image={project.image}
                title={project.title}
                description={project.description}
                link={project.link}
                buttonText={project.buttonText}
                link2={project.link2}
                buttonText2={project.buttonText2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
