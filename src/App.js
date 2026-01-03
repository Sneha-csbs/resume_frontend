import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8001';

function App() {
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    
    // Professional Summary
    summary: '',
    
    // Skills
    technicalSkills: '',
    softSkills: '',
    tools: '',
    languages: '',
    
    // Experience
    experience: '',
    
    // Education
    education: '',
    
    // Projects
    projects: '',
    
    // Certifications
    certifications: '',
    
    // Achievements
    achievements: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const allSkills = [
        ...formData.technicalSkills.split(',').map(s => s.trim()).filter(s => s),
        ...formData.softSkills.split(',').map(s => s.trim()).filter(s => s),
        ...formData.tools.split(',').map(s => s.trim()).filter(s => s),
        ...formData.languages.split(',').map(s => s.trim()).filter(s => s)
      ];
      
      const response = await axios.post(`${API_BASE_URL}/resumes/analyze-all`, {
        skills: allSkills,
        experience: `${formData.experience}\n\nEducation: ${formData.education}\n\nCertifications: ${formData.certifications}\n\nAchievements: ${formData.achievements}`,
        projects: formData.projects
      });
      
      setResults(response.data);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 70) return 'text-emerald-600';
    if (numScore >= 50) return 'text-amber-600';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 70) return 'bg-emerald-50 border-emerald-200';
    if (numScore >= 50) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="gradient-emerald text-white py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-poppins font-bold text-center mb-4">Resume Automation</h1>
          <p className="text-xl text-center opacity-95 font-medium">AI-powered job matching and resume tailoring</p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Input Form */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="gradient-card rounded-2xl p-8 border border-gray-100">
            <h2 className="text-3xl font-poppins font-semibold mb-8 text-gray-800">Enter Your Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                <h3 className="text-xl font-poppins font-semibold text-emerald-700 mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Location (City, State)"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="LinkedIn Profile URL"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="GitHub Profile URL"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  placeholder="Portfolio Website URL"
                  className="w-full mt-4 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Professional Summary */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 font-poppins">
                  Professional Summary
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  placeholder="Brief professional summary highlighting your key strengths and career objectives..."
                  rows="3"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-gray-700"
                  required
                />
              </div>

              {/* Skills Section */}
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <h3 className="text-xl font-poppins font-semibold text-amber-700 mb-4">Skills & Technologies</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="technicalSkills"
                    value={formData.technicalSkills}
                    onChange={handleInputChange}
                    placeholder="Technical Skills (Python, JavaScript, React, Node.js, SQL, etc.)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                  <input
                    type="text"
                    name="tools"
                    value={formData.tools}
                    onChange={handleInputChange}
                    placeholder="Tools & Frameworks (Git, Docker, AWS, Jenkins, etc.)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <input
                    type="text"
                    name="softSkills"
                    value={formData.softSkills}
                    onChange={handleInputChange}
                    placeholder="Soft Skills (Leadership, Communication, Problem-solving, etc.)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    placeholder="Programming Languages (Python, Java, C++, etc.)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 font-poppins">
                  Work Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Job Title | Company Name | Duration (MM/YYYY - MM/YYYY)\nKey responsibilities and achievements...\n\nJob Title | Company Name | Duration\nKey responsibilities and achievements..."
                  rows="6"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-gray-700"
                  required
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 font-poppins">
                  Education
                </label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="Degree | University/College | Graduation Year\nRelevant coursework, GPA (if above 3.5), honors..."
                  rows="3"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-gray-700"
                  required
                />
              </div>

              {/* Projects */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 font-poppins">
                  Projects
                </label>
                <textarea
                  name="projects"
                  value={formData.projects}
                  onChange={handleInputChange}
                  placeholder="Project Name | Technologies Used\nProject description, your role, key features, impact...\n\nProject Name | Technologies Used\nProject description, your role, key features, impact..."
                  rows="5"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-gray-700"
                  required
                />
              </div>

              {/* Certifications */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 font-poppins">
                  Certifications
                </label>
                <textarea
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="Certification Name | Issuing Organization | Date\nAWS Certified Solutions Architect | Amazon | 2023\nGoogle Cloud Professional | Google | 2022"
                  rows="3"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-gray-700"
                />
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 font-poppins">
                  Achievements & Awards
                </label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  placeholder="Employee of the Month | Company Name | 2023\nHackathon Winner | Event Name | 2022\nPublished research paper in XYZ Journal | 2021"
                  rows="3"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-gray-700"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 text-white py-4 px-8 rounded-xl font-poppins font-semibold text-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-8">
            {/* Summary */}
            <div className="gradient-card rounded-2xl p-8 border border-gray-100">
              <h2 className="text-3xl font-poppins font-semibold mb-6 text-gray-800">Analysis Summary</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
                  <div className="text-3xl font-poppins font-bold text-emerald-600">{results.total_jobs_analyzed}</div>
                  <div className="text-sm text-gray-600 font-medium mt-1">Jobs Analyzed</div>
                </div>
                <div className="text-center p-6 bg-amber-50 border-2 border-amber-200 rounded-xl">
                  <div className="text-3xl font-poppins font-bold text-amber-600">{results.summary.average_probability.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 font-medium mt-1">Avg. Match Score</div>
                </div>
                <div className="text-center p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <div className="text-xl font-poppins font-bold text-blue-600">{results.summary.best_match.job_title}</div>
                  <div className="text-sm text-gray-600 font-medium mt-1">Best Match</div>
                </div>
              </div>
            </div>

            {/* Job Analyses */}
            <div className="space-y-6">
              <h2 className="text-3xl font-poppins font-semibold text-gray-800">Job Analysis Results</h2>
              
              {results.job_analyses.map((job, index) => (
                <div key={index} className="gradient-card rounded-2xl p-8 border border-gray-100">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-poppins font-semibold text-gray-800">{job.job_title}</h3>
                      <p className="text-gray-600 font-medium text-lg">{job.company}</p>
                    </div>
                    <div className={`text-center p-4 rounded-xl border-2 ${getScoreBg(job.analysis.shortlist_probability)}`}>
                      <div className={`text-3xl font-poppins font-bold ${getScoreColor(job.analysis.shortlist_probability)}`}>
                        {job.analysis.shortlist_probability}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Match Score</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mb-8">
                    <a
                      href={job.job_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition duration-200 font-poppins font-semibold shadow-lg hover:shadow-xl"
                    >
                      Apply for Job
                    </a>
                    <a
                      href={job.tailored_resume_download}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-500 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition duration-200 font-poppins font-semibold shadow-lg hover:shadow-xl"
                    >
                      Download Resume
                    </a>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Tailored Resume */}
                    <div>
                      <h4 className="font-poppins font-semibold text-gray-800 mb-4 text-lg">Tailored Resume</h4>
                      <div className="bg-gray-50 p-6 rounded-xl space-y-4 border border-gray-200">
                        <div>
                          <span className="font-poppins font-semibold text-gray-700">Summary:</span>
                          <p className="text-gray-700 mt-1">{job.tailored_resume.summary}</p>
                        </div>
                        <div>
                          <span className="font-poppins font-semibold text-gray-700">Skills:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {job.tailored_resume.skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-lg font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Analysis */}
                    <div>
                      <h4 className="font-poppins font-semibold text-gray-800 mb-4 text-lg">Analysis</h4>
                      <div className="space-y-4">
                        {/* Matching Skills */}
                        {job.analysis.matching_skills.length > 0 && (
                          <div>
                            <span className="text-sm font-poppins font-semibold text-emerald-600">Matching Skills:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {job.analysis.matching_skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-lg font-medium">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Missing Skills */}
                        {job.analysis.missing_skills.length > 0 && (
                          <div>
                            <span className="text-sm font-poppins font-semibold text-red-500">Missing Skills:</span>
                            <div className="space-y-2 mt-2">
                              {job.analysis.missing_skills.map((item, i) => (
                                <div key={i} className="text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                                  <span className="font-poppins font-semibold text-red-700">{item.skill}</span>
                                  <br />
                                  <span className="text-gray-600">Learn at: {item.platform}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Rejection Reasons */}
                        <div>
                          <span className="text-sm font-poppins font-semibold text-amber-600">Potential Issues:</span>
                          <ul className="text-sm text-gray-700 mt-2 space-y-1">
                            {job.analysis.rejection_reasons.map((reason, i) => (
                              <li key={i} className="flex items-start bg-amber-50 p-2 rounded-lg border border-amber-200">
                                <span className="text-amber-500 mr-2 font-bold">•</span>
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-poppins font-semibold text-gray-800 mb-3 text-lg">Job Description</h4>
                    <p className="text-gray-700 leading-relaxed">{job.job_description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;