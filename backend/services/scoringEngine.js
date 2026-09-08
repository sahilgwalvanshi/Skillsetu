/**
 * Skill Setu Scoring Engine
 * Computes multi-factor score for an officer across skills and compares against role benchmarks.
 */

export function calculateSkillScore({
  selfRating = 3,
  diagnosticScore = 3,
  experienceYears = 5,
  pastTrainings = '',
  completedCoursesCount = 0,
  isSkillCourseCompleted = false,
  outputScore = 3.5
}) {
  // Normalize experience to 1-5 scale (1 year = ~2.0, 10+ years = 5.0)
  const experienceWeight = Math.min(5.0, Math.max(1.0, 1.5 + experienceYears * 0.35));

  // Compute training completion score dynamically from DB records
  let baseTraining = (pastTrainings && pastTrainings.length > 5) ? 3.0 : 2.0;
  if (completedCoursesCount > 0) {
    baseTraining += completedCoursesCount * 0.6;
  }
  if (isSkillCourseCompleted) {
    baseTraining += 1.0;
  }
  const trainingCompletionScore = Math.min(5.0, Math.max(1.0, Number(baseTraining.toFixed(1))));

  const finalScore =
    0.20 * selfRating +
    0.35 * diagnosticScore +
    0.20 * experienceWeight +
    0.15 * trainingCompletionScore +
    0.10 * outputScore;

  return Number(finalScore.toFixed(2));
}

export function calculateGap(finalScore, requiredLevel) {
  const diff = requiredLevel - finalScore;
  return Number(Math.max(0, diff).toFixed(2));
}
