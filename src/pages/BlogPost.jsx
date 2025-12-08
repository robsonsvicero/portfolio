import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Preloader from '../components/Preloader'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState([])

  // Inicializar Facebook SDK
  useEffect(() => {
    // Carregar o SDK do Facebook
    if (window.FB) {
      window.FB.XFBML.parse()
    } else {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: '1616292912873079', 
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v18.0'
        })
      }

      // Carregar o SDK
      const script = document.createElement('script')
      script.id = 'facebook-jssdk'
      script.src = 'https://connect.facebook.net/pt_BR/sdk.js'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)
    }
  }, [])

  // Buscar post por slug
  const fetchPost = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('publicado', true)
        .single()

      if (error) throw error

      if (!data) {
        navigate('/404')
        return
      }

      setPost(data)

      // Buscar posts relacionados (mesma categoria)
      if (data.categoria) {
        const { data: related } = await supabase
          .from('posts')
          .select('*')
          .eq('publicado', true)
          .eq('categoria', data.categoria)
          .neq('id', data.id)
          .order('data_publicacao', { ascending: false })
          .limit(3)

        setRelatedPosts(related || [])
      }
    } catch (error) {
      console.error('Erro ao buscar post:', error)
      navigate('/404')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
    window.scrollTo(0, 0)
  }, [slug])

  // Recarregar plugin do Facebook quando o post mudar
  useEffect(() => {
    if (post && window.FB) {
      setTimeout(() => {
        window.FB.XFBML.parse()
      }, 100)
    }
  }, [post])

  // Formatar data
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Renderizar conteúdo com quebras de linha preservadas
  const renderContent = (content) => {
    const lines = content.split('\n')
    const elements = []
    let listItems = []

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      
      // Linha vazia - ignora
      if (trimmedLine === '') {
        // Se havia itens de lista acumulados, fecha a lista
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-6">
              {listItems}
            </ul>
          )
          listItems = []
        }
        return
      }
      
      // Detectar títulos Markdown (## ou ##Título)
      if (/^##\s+/.test(trimmedLine) || /^##[^#]/.test(trimmedLine)) {
        // Fecha lista se existir
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-6">
              {listItems}
            </ul>
          )
          listItems = []
        }
        const title = trimmedLine.replace(/^##\s*/, '')
        elements.push(
          <h2 key={index} className="font-title text-3xl font-light text-low-dark mt-8 mb-4">
            {title}
          </h2>
        )
        return
      }
      
      // Detectar subtítulos Markdown (### ou ###Subtítulo)
      if (/^###\s+/.test(trimmedLine) || /^###[^#]/.test(trimmedLine)) {
        // Fecha lista se existir
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-6">
              {listItems}
            </ul>
          )
          listItems = []
        }
        const subtitle = trimmedLine.replace(/^###\s*/, '')
        elements.push(
          <h3 key={index} className="font-title text-2xl font-light text-low-dark mt-6 mb-3">
            {subtitle}
          </h3>
        )
        return
      }

      // Detectar listas (- item ou * item)
      if (/^[-*]\s+/.test(trimmedLine)) {
        const itemText = trimmedLine.replace(/^[-*]\s+/, '')
        listItems.push(
          <li key={index} className="text-lg text-low-medium leading-relaxed mb-2">
            {itemText}
          </li>
        )
        return
      }

      // Detectar imagens Markdown ![alt](url)
      const imageMatch = trimmedLine.match(/!\[(.*?)\]\((.*?)\)/)
      if (imageMatch) {
        // Fecha lista se existir
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-6">
              {listItems}
            </ul>
          )
          listItems = []
        }
        const [, alt, url] = imageMatch
        elements.push(
          <div key={index} className="my-8">
            <img 
              src={url} 
              alt={alt || 'Imagem do artigo'} 
              className="w-full rounded-lg shadow-lg"
              loading="lazy"
            />
            {alt && (
              <p className="text-sm text-low-medium italic text-center mt-2">
                {alt}
              </p>
            )}
          </div>
        )
        return
      }

      // Fecha lista se existir antes de adicionar parágrafo
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc ml-6 mb-6">
            {listItems}
          </ul>
        )
        listItems = []
      }

      // Parágrafo normal
      elements.push(
        <p key={index} className="text-lg text-low-medium leading-relaxed mb-6">
          {line}
        </p>
      )
    })

    // Fecha lista final se existir
    if (listItems.length > 0) {
      elements.push(
        <ul key="list-final" className="list-disc ml-6 mb-6">
          {listItems}
        </ul>
      )
    }

    return elements
  }

  if (isLoading) {
    return (
      <>
        <Preloader />
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-low-medium">Carregando post...</p>
          </div>
        </div>
      </>
    )
  }

  if (!post) return null

  return (
    <>
      <Preloader />
      <div className="min-h-screen bg-cream">
        <Header variant="solid" />
        
        <article className="pt-[200px] pb-24 px-4 md:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link to="/blog" className="text-primary hover:underline font-medium">
                <i className="fa-solid fa-arrow-left mr-2"></i>
                Voltar ao Blog
              </Link>
            </nav>

            {/* Cabeçalho do Post */}
            <header className="mb-12">
              {/* Categoria e Data */}
              <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
                {post.categoria && (
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
                    {post.categoria}
                  </span>
                )}
                <span className="text-low-medium flex items-center gap-2">
                  <i className="fa-regular fa-calendar"></i>
                  {formatDate(post.data_publicacao)}
                </span>
                {post.autor && (
                  <span className="text-low-medium flex items-center gap-2">
                    <i className="fa-regular fa-user"></i>
                    {post.autor}
                  </span>
                )}
              </div>

              {/* Título */}
              <h1 className="font-title text-4xl md:text-5xl font-light text-low-dark mb-6 leading-tight">
                {post.titulo}
              </h1>

              {/* Resumo */}
              {post.resumo && (
                <p className="text-xl text-low-medium leading-relaxed border-l-4 border-primary pl-6 py-2">
                  {post.resumo}
                </p>
              )}

              {/* Tags */}
              {post.tags && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.toLowerCase().split(',').map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors cursor-default"
                    >
                      <i className="fa-solid fa-tag mr-2"></i>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Imagem de Destaque */}
            {post.imagem_destaque && (
              <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={post.imagem_destaque}
                  alt={post.titulo}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Conteúdo do Post */}
            <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-16 border border-cream/20">
              <div className="prose prose-lg max-w-none">
                {renderContent(post.conteudo)}
              </div>
            </div>

            {/* Seção de Comentários do Facebook */}
            <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-16 border border-cream/20">
              <h2 className="font-title text-2xl font-light text-low-dark mb-6 pb-4 border-b border-cream/40">
                <i className="fa-regular fa-comments mr-3 text-primary"></i>
                Comentários
              </h2>
              <div 
                className="fb-comments" 
                data-href={`https://robsonsvicero.com.br/blog/${post.slug}`}
                data-width="100%" 
                data-numposts="5"
                data-colorscheme="light"
                data-order-by="reverse_time"
              ></div>
            </div>

            {/* Posts Relacionados */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-16 border-t border-cream/40">
                <h2 className="font-title text-3xl font-light text-low-dark mb-8">
                  Posts Relacionados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-cream/20"
                    >
                      {relatedPost.imagem_destaque && (
                        <div className="aspect-video overflow-hidden bg-cream">
                          <img
                            src={relatedPost.imagem_destaque}
                            alt={relatedPost.titulo}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-title text-lg font-light text-low-dark group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.titulo}
                        </h3>
                        <span className="text-sm text-low-medium mt-2 block">
                          {formatDate(relatedPost.data_publicacao)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>

        <Footer />
      </div>
    </>
  )
}

export default BlogPost
