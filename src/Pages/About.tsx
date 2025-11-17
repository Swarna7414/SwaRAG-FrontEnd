import React from 'react';
import Pic from "../assets/about.png"
import { displaylinks } from '../util/types';

const About: React.FC = () => {

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          
          
          <div className="w-full md:w-[35%] lg:w-[35%] xl:w-[35%] border-2 border-gray-300 rounded-lg p-4 md:p-6">
            <div>
              <img src={Pic} alt="Sai Image" className='rounded-2xl w-full' />
              <br />
              <h1 className='m-1 font-bold text-2xl italic text-center hover:underline hover:decoration-blue-500 hover:text-blue-800'>Sai Sankar Swarna</h1>
              <p className="mt-4 text-black text-md leading-relaxed text-justify">
                Hello, this is Sai Sankar Swarna. I am a graduate student, and I developed this project as part of my academic studies. The work reflects my interest in building intelligent 
                search systems and exploring modern information-retrieval techniques. This project was created purely for academic and research purposes and my contact detials are mentioned below
              </p>
              <br />
              <hr className='mt-0.5'/>
              
              <div className="mt-4 space-y-4">
                {displaylinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.value.startsWith('http') ? link.value : `https://${link.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 hover:bg-gray-100 transition-colors duration-200 rounded-lg cursor-pointer"
                  >
                    
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <div className="text-black text-2xl hover:text-blue-400">
                        {link.logo}
                      </div>
                    </div>
                    
                    
                    <div className="flex-1 min-w-0">
                      
                      <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                        {link.name.toUpperCase()}
                      </div>
                      
                      <div className="text-gray-800 hover:text-blue-500 transition-colors duration-200 block truncate">
                        {link.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          
          <div className="w-full md:w-[65%] border-2 border-gray-300 rounded-lg p-6 overflow-y-auto max-h-[calc(100vh+5.8rem)]">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Design and Implementation of the SwaRAG</h1>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Overview</h2>
                <p className="text-justify">
                  SwaRAG is a custom-built search and analysis engine designed to retrieve, index, and summarize Stack Overflow content. It combines traditional information-retrieval methods with structured answer generation to deliver fast, accurate, and easy-to-understand programming solutions. The system collects Stack Overflow questions and answers, stores them locally, builds a search index, ranks documents using BM25, and can produce a consolidated explanation using relevant excerpts from multiple posts. SwaRAG also includes a dedicated frontend built using modern web technologies to provide an intuitive user experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Data Collection and Storage</h2>
                <p className="text-justify">
                  SwaRAG begins by fetching Stack Overflow data using the Stack Exchange API. Questions, answers, tags, scores, creation dates, and links are downloaded and stored in a local SQLite database. The schema includes tables for questions, answers, the inverted index, and document statistics. Indexes on common fields allow the system to efficiently search large volumes of content. Once the data is stored locally, all search operations can run completely offline, ensuring speed and reliability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Text Processing Pipeline</h2>
                <p className="text-justify">
                  Before indexing or searching, SwaRAG processes and normalizes all text. The pipeline removes HTML, isolates code blocks, converts text to lowercase, tokenizes, removes stopwords, and applies stemming to reduce words to their base form. Programming-related tokens such as annotations, method names, and class names are also extracted. By standardizing text in this way, SwaRAG ensures accurate term matching and consistent search performance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Indexing and Inverted Index Construction</h2>
                <p className="text-justify">
                  The processed text is converted into an inverted index—the foundational structure behind fast search engines. For each unique term, the index stores which documents contain it, how frequently it appears, and its positions within each document. Document lengths and other statistics are stored separately. SwaRAG applies additional weight to terms found in question titles because these typically represent the main topic. This index enables rapid retrieval of relevant documents for any incoming query.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Search and Ranking Using BM25</h2>
                <p className="text-justify">
                  When a search query is submitted, SwaRAG processes it in the same way it processed the stored documents. It then uses the inverted index to identify all documents containing the query terms and ranks them using the BM25 algorithm. BM25 considers term frequency, inverse document frequency, and document length. The system enhances BM25 scores with several domain-specific adjustments, including title boosting, Stack Overflow score boosting, and slight recency weighting. Documents that fall below a defined minimum relevance threshold are discarded to maintain result quality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Structured Answer Synthesis (RAG)</h2>
                <p className="text-justify">
                  In addition to simple ranked retrieval, SwaRAG can produce a consolidated, structured answer using a Retrieval-Augmented Generation (RAG) approach. The system takes the top search results, extracts important explanations, code fragments, and steps, and organizes them into clearly defined sections such as step-by-step instructions, conceptual explanations, and example code. This method does not generate new information; instead, it synthesizes the most useful content from multiple relevant posts and cites the original sources. This allows users to understand the solution quickly without manually reading several Stack Overflow threads.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Frontend Interface (React + React Router + Tailwind CSS)</h2>
                <p className="text-justify">
                  SwaRAG includes a fully developed frontend built using React. The interface is designed to be clean, fast, and easy to navigate. React Router is used to manage client-side navigation, enabling smooth transitions between different views such as the search page, RAG results, database statistics, and system diagnostics. The styling is implemented entirely with Tailwind CSS, which provides a modern, responsive, and utility-first design without the need for custom CSS frameworks. The frontend communicates with the Flask backend through REST API calls, making the system interactive and user-friendly while maintaining a polished, professional appearance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">API Layer and System Interaction</h2>
                <p className="text-justify">
                  SwaRAG exposes its functionality through a structured REST API. Endpoints include system health checks, local BM25 search, RAG-enhanced search, index statistics, and a database console. The frontend communicates with these endpoints to retrieve search results, synthesized responses, and performance information. This separation between frontend and backend ensures modularity, maintainability, and the ability to expand the system without rewriting existing components.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Deployment</h2>
                <p className="text-justify">
                  The system is packaged in a Docker container and deployed on Hugging Face Spaces. This deployment includes the Flask backend, the local SQLite database, and a Gunicorn server for production-level performance. The frontend build is served alongside the backend, and the entire application runs seamlessly in a contained environment. Once the initial dataset is downloaded, all core search features operate offline except for optional live Stack Overflow queries.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
