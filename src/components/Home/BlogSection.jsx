import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const BlogSection = ({ blogPosts }) => {
  return (
    <section id="blog" className="bg-cream py-24 px-4 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="font-title text-4xl md:text-5xl font-light text-dark-bg mb-4">
            Últimas do Blog
          </h2>
          <p className="font-sans text-lg text-low-medium max-w-2xl mx-auto leading-relaxed">
            Reflexões sobre design, desenvolvimento e estratégia digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {post.imagem_capa && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.imagem_capa}
                    alt={post.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-sm">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    {post.categoria}
                  </span>
                  <span className="text-low-medium">
                    {formatDate(post.data_publicacao)}
                  </span>
                </div>
                <h3 className="font-title text-xl font-semibold text-dark-bg mb-3 leading-snug group-hover:text-primary transition-colors">
                  {post.titulo}
                </h3>
                <p className="font-sans text-low-medium leading-relaxed line-clamp-3">
                  {post.resumo}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Ver todos os posts
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
