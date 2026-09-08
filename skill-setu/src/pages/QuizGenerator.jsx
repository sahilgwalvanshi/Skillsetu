import React, { useState } from 'react';
import { Sparkles, FileText, Upload, CheckCircle2, XCircle, RefreshCw, Award, HelpCircle, FileCheck, Film, Presentation } from 'lucide-react';
import { api } from '../services/api';

export default function QuizGenerator({ currentUser }) {
  const [inputText, setInputText] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizTitle, setQuizTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState('');
  const [generatedQuiz, setGeneratedQuiz] = useState(null);

  // Interactive Quiz Taking state
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const sampleTexts = [
    {
      title: 'Consumer Price Index (CPI) Guidelines 2026',
      content: `The Consumer Price Index (CPI) measures changes over time in the general level of prices of goods and services that a reference population acquires, uses, or pays for consumption. In India, CPI numbers are compiled separately for rural, urban, and combined sectors by the National Statistical Office (NSO), Ministry of Statistics and Programme Implementation. The index is compiled using the modified Laspeyres formula, with base year weights derived from the Household Consumer Expenditure Survey (HCES). Data collection is executed monthly across 1,181 village markets and 1,114 urban markets.`
    },
    {
      title: 'Digital Personal Data Protection (DPDP) Act Compliance',
      content: `The Digital Personal Data Protection Act, 2023 provides for the processing of digital personal data in a manner that recognizes both the right of individuals to protect their personal data and the need to process such data for lawful purposes. Government data fiduciaries conducting large-scale household surveys must ensure notice and consent mechanisms, employ differential privacy algorithms, and anonymize microdata before releasing public datasets on the Open Government Data (OGD) platform.`
    }
  ];

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');

    try {
      const res = await api.uploadMaterial(file);
      setUploadedFile({ filename: res.filename, size: res.size });
      setInputText(res.text);
      if (!quizTitle) {
        setQuizTitle(`Quiz from ${res.filename.replace(/\.[^/.]+$/, '')}`);
      }
    } catch (err) {
      console.error('File upload error:', err);
      setError('Failed to extract text from uploaded file.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!inputText || inputText.trim().length < 20) {
      setError('Please upload a document or provide at least 20 characters of document text.');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedQuiz(null);
    setUserAnswers({});
    setSubmitted(false);

    try {
      const data = await api.generateQuiz(
        inputText,
        Number(numQuestions),
        quizTitle || 'MoSPI Official AI Assessment',
        currentUser?.name || 'MoSPI Trainer'
      );
      setGeneratedQuiz(data);
    } catch (err) {
      console.error('Quiz generation error:', err);
      setError(err.message || 'Failed to generate quiz. Verify backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qIdx, oIdx) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!generatedQuiz?.questions) return;
    let correctCount = 0;
    generatedQuiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-parchment py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-ink via-ink-light to-sandstone-dark text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-ochre uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-ochre" />
            <span>Groq LLM Fast Inference Engine (Llama 3.3 70B)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-parchment">
            AI-Powered Learning Material MCQ & Quiz Generator
          </h1>
          <p className="text-xs sm:text-sm text-parchment/80 max-w-2xl">
            Upload official MoSPI training documents, presentations, or video transcripts to automatically synthesize validated multiple-choice assessment questions.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* File Upload Dropzone + Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/15 space-y-6">
          <div className="flex items-center justify-between border-b border-slate/10 pb-4">
            <h2 className="text-lg font-bold font-display text-ink flex items-center space-x-2">
              <Upload className="w-5 h-5 text-sandstone" />
              <span>Upload Learning Material</span>
            </h2>
            <span className="text-xs text-slate">Supports Documents, Presentations & Transcripts</span>
          </div>

          {/* File Drag and Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-slate/30 hover:border-sandstone bg-parchment/30 rounded-2xl p-6 text-center transition cursor-pointer group"
          >
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.docx,.doc,.txt,.pptx,.ppt,.md,.json,.csv,.vtt,.srt"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer block space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-sandstone/10 text-sandstone flex items-center justify-center mx-auto group-hover:scale-110 transition transform">
                {uploading ? <RefreshCw className="w-7 h-7 animate-spin" /> : <Upload className="w-7 h-7" />}
              </div>
              <div>
                <div className="text-sm font-bold text-ink">
                  {uploading ? 'Extracting Text from File...' : 'Click to Upload or Drag & Drop File'}
                </div>
                <div className="text-xs text-slate mt-1 flex items-center justify-center space-x-3">
                  <span className="flex items-center space-x-1"><FileText className="w-3.5 h-3.5 text-sandstone" /> <span>Documents (.pdf, .docx, .txt)</span></span>
                  <span className="flex items-center space-x-1"><Presentation className="w-3.5 h-3.5 text-amber-500" /> <span>Presentations (.pptx)</span></span>
                  <span className="flex items-center space-x-1"><Film className="w-3.5 h-3.5 text-blue-500" /> <span>Video Transcripts (.txt, .vtt)</span></span>
                </div>
              </div>
            </label>
          </div>

          {/* Uploaded File Badge indicator */}
          {uploadedFile && (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Uploaded: <b>{uploadedFile.filename}</b> ({uploadedFile.size})</span>
              </div>
              <span className="text-emerald-700 font-bold">Text Extracted Successfully ✓</span>
            </div>
          )}

          {/* Preset Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate/10">
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider">
              Or Select Sample MoSPI Material:
            </label>
            <div className="flex flex-wrap gap-2">
              {sampleTexts.map((st, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputText(st.content);
                    setQuizTitle(st.title);
                    setUploadedFile(null);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate/20 hover:border-sandstone bg-parchment/40 text-xs font-medium text-ink hover:text-sandstone transition"
                >
                  📄 {st.title}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate mb-1">Quiz Title (Optional)</label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="e.g. National Accounts Assessment 2026"
                className="w-full px-4 py-2.5 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate mb-1">Extracted Training Text / Material Content</label>
              <textarea
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Uploaded document or transcript text will auto-populate here, or you can type directly..."
                className="w-full px-4 py-3 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none font-sans"
                required
              />
              <div className="flex justify-between text-[11px] text-slate mt-1">
                <span>Character Count: {inputText.length}</span>
                <span>Max: 4,000 characters</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate mb-1">Number of MCQs</label>
                <select
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-slate/30 text-xs font-semibold text-ink focus:border-sandstone outline-none"
                >
                  <option value={3}>3 Questions</option>
                  <option value={5}>5 Questions</option>
                  <option value={8}>8 Questions</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading || !inputText}
                className="px-6 py-3 bg-sandstone hover:bg-sandstone-dark text-white rounded-xl font-bold text-sm transition shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Groq LLM Generating MCQs...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Quiz with Groq AI</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Generated Quiz Interactive Card */}
        {generatedQuiz && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/15 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate/10 pb-4">
              <div>
                <span className="text-xs font-bold text-sandstone uppercase tracking-wider">
                  Interactive AI-Generated Assessment
                </span>
                <h2 className="text-xl font-bold font-display text-ink mt-1">
                  {generatedQuiz.title}
                </h2>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                {generatedQuiz.questions?.length} MCQs Ready
              </span>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {generatedQuiz.questions?.map((q, qIdx) => {
                const selectedOpt = userAnswers[qIdx];
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div
                    key={qIdx}
                    className={`p-5 rounded-2xl border transition ${
                      submitted
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/50'
                          : 'border-red-200 bg-red-50/30'
                        : 'border-slate/15 bg-parchment/20'
                    }`}
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <span className="w-7 h-7 rounded-xl bg-sandstone text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                        Q{qIdx + 1}
                      </span>
                      <div className="text-sm font-bold text-ink pt-0.5">{q.question}</div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pl-10">
                      {q.options?.map((opt, oIdx) => {
                        let btnStyle = 'border-slate/20 bg-white hover:bg-parchment text-ink';

                        if (selectedOpt === oIdx) {
                          btnStyle = 'border-sandstone bg-sandstone/10 font-bold text-sandstone-dark';
                        }

                        if (submitted) {
                          if (oIdx === q.correctIndex) {
                            btnStyle = 'border-emerald-500 bg-emerald-100 font-bold text-emerald-900';
                          } else if (selectedOpt === oIdx && oIdx !== q.correctIndex) {
                            btnStyle = 'border-red-400 bg-red-100 font-bold text-red-900';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={submitted}
                            onClick={() => handleSelectOption(qIdx, oIdx)}
                            className={`p-3 rounded-xl text-left text-xs transition border flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {submitted && oIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            )}
                            {submitted && selectedOpt === oIdx && oIdx !== q.correctIndex && (
                              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation block when submitted */}
                    {submitted && (
                      <div className="mt-4 ml-10 p-3 rounded-xl bg-white border border-slate/15 text-xs text-slate space-y-1">
                        <div className="font-bold text-ink flex items-center space-x-1">
                          <HelpCircle className="w-3.5 h-3.5 text-sandstone" />
                          <span>Explanation:</span>
                        </div>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action / Result Footer */}
            <div className="pt-4 border-t border-slate/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!submitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(userAnswers).length < generatedQuiz.questions?.length}
                  className="w-full sm:w-auto px-8 py-3 bg-sandstone hover:bg-sandstone-dark text-white rounded-xl font-bold text-sm shadow-md transition disabled:opacity-40"
                >
                  Submit & Check Score ({Object.keys(userAnswers).length}/{generatedQuiz.questions?.length})
                </button>
              ) : (
                <div className="w-full flex items-center justify-between bg-parchment p-4 rounded-2xl border border-slate/15">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-sandstone text-white font-bold flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink">
                        Quiz Score: {score} / {generatedQuiz.questions?.length}
                      </div>
                      <div className="text-xs text-slate">
                        {((score / generatedQuiz.questions?.length) * 100).toFixed(0)}% Accuracy Verified
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setUserAnswers({});
                    }}
                    className="px-4 py-2 border border-slate/30 text-xs font-semibold rounded-xl hover:bg-white transition"
                  >
                    Retake Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
