/* ===============================================
   BMA-2026 Application Form - JavaScript
   Interactive form handling and results calculation
   =============================================== */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const emotionalStabilitySlider = document.getElementById('emotionalStability');
    const emotionalStabilityValue = document.getElementById('emotionalStabilityValue');
    const emotionalStabilityFeedback = document.getElementById('emotionalStabilityFeedback');
    
    const horninesslevelSlider = document.getElementById('horninessLevel');
    const horninesslevelValue = document.getElementById('horniness LevelValue');
    const horninessFeedback = document.getElementById('horninessFeedback');
    
    const processingPanel = document.getElementById('processingPanel');
    const resultsScreen = document.getElementById('resultsScreen');
    const resetBtn = document.getElementById('resetBtn');
    const fakeProgressFill = document.getElementById('fakeProgressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    
    // Emotional Stability slider feedback
    emotionalStabilitySlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        emotionalStabilityValue.textContent = value;
        
        let feedback = '';
        if (value >= 1 && value <= 3) {
            feedback = 'We appreciate the transparency.';
        } else if (value >= 4 && value <= 7) {
            feedback = 'Operationally manageable.';
        } else if (value >= 8 && value <= 10) {
            feedback = 'Suspicious. No one is that stable.';
        }
        emotionalStabilityFeedback.textContent = feedback;
    });
    
    // Horniness Level slider feedback
    horninesslevelSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        horninesslevelValue.textContent = value;
        
        let feedback = '';
        if (value >= 1 && value <= 3) {
            feedback = 'Low risk.';
        } else if (value >= 4 && value <= 7) {
            feedback = 'Standard operating levels.';
        } else if (value >= 8 && value <= 10) {
            feedback = 'Initiate containment protocol.';
        }
        horninessFeedback.textContent = feedback;
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check certification
        const certification = document.getElementById('certification').checked;
        if (!certification) {
            alert('You must certify that you understand this form does not guarantee deployment.');
            return;
        }
        
        // Show processing panel and overlay
        processingPanel.classList.remove('hidden');
        
        // Simulate processing steps
        let progress = 0;
        const progressInterval = setInterval(function() {
            progress += Math.random() * 25;
            if (progress > 95) progress = 95;
            
            fakeProgressFill.style.width = progress + '%';
            progressPercentage.textContent = Math.floor(progress) + '%';
        }, 200);
        
        // After 2.5 seconds, finish processing
        setTimeout(function() {
            clearInterval(progressInterval);
            fakeProgressFill.style.width = '100%';
            progressPercentage.textContent = '100%';
            
            // Calculate compatibility score and show results after a delay
            setTimeout(function() {
                showResults();
                processingPanel.classList.add('hidden');
            }, 600);
        }, 2500);
    });
    
    // Calculate Compatibility Score
    function calculateCompatibilityScore() {
        // Base score: random 55-88
        let score = Math.floor(Math.random() * (88 - 55 + 1)) + 55;
        
        // Get form values
        const emotionalStability = parseInt(document.getElementById('emotionalStability').value);
        const horniness = parseInt(document.getElementById('horninessLevel').value);
        const conflictResolution = document.querySelector('input[name="conflictResolution"]:checked')?.value;
        const intent = document.getElementById('intent').value;
        const fitnessLevel = document.getElementById('fitnessLevel').value;
        const tacticalPosition = document.querySelector('input[name="tacticalPosition"]:checked')?.value;
        const backgroundChecks = document.querySelectorAll('input[name="backgroundChecks"]:checked').length;
        
        // Check for Doggy Easter Egg
        if (tacticalPosition === 'doggy') {
            return { score: 1000, isEasterEgg: true };
        }
        
        // Emotional Stability boost
        if (emotionalStability >= 4 && emotionalStability <= 7) {
            score += 5;
        }
        
        // Fitness Level boosts
        if (fitnessLevel === 'active-duty-ready') {
            score += 6;
        } else if (fitnessLevel === 'gym-5x') {
            score += 4;
        }
        
        // Intent boost
        if (intent === 'long-term-mission') {
            score += 4;
        }
        
        // Background checks
        const checkBonus = Math.min(backgroundChecks, 6); // Cap at +6
        score += checkBonus;
        
        // Conflict Resolution
        if (conflictResolution === 'communicate-directly') {
            score += 5;
        } else if (conflictResolution === 'its-fine') {
            score -= 3;
        }
        
        // Clamp between 0-99
        score = Math.max(0, Math.min(99, score));
        
        return { score: score, isEasterEgg: false };
    }
    
    // Generate status based on score
    function generateStatus(score) {
        if (score >= 85) {
            return 'Cleared for Immediate Deployment';
        } else if (score >= 70) {
            return 'Provisionally Cleared for Further Evaluation';
        } else if (score >= 55) {
            return 'Proceed with Caution';
        } else if (score >= 40) {
            return 'Under Further Review';
        } else {
            return 'Requires Additional Screening';
        }
    }
    
    // Show Results
    function showResults() {
        const result = calculateCompatibilityScore();
        const compatibilityIndex = document.getElementById('compatibilityIndex');
        const statusText = document.getElementById('statusText');
        const resultsStamp = document.getElementById('resultsStamp');
        
        if (result.isEasterEgg) {
            compatibilityIndex.textContent = '1000%';
            statusText.textContent = 'CLASSIFIED MATCH CONFIRMED.';
            resultsStamp.innerHTML = '<span>CLASSIFIED</span>';
            resultsStamp.style.color = '#FF0000';
            resultsStamp.style.borderColor = '#FF0000';
        } else {
            compatibilityIndex.textContent = result.score + '%';
            statusText.textContent = generateStatus(result.score);
            resultsStamp.innerHTML = '<span>APPROVED</span>';
            resultsStamp.style.color = '#4CAF50';
            resultsStamp.style.borderColor = '#4CAF50';
        }
        
        // Show results screen and hide form
        document.querySelector('.form-header').style.display = 'none';
        document.querySelector('.disclaimer-banner').style.display = 'none';
        document.querySelector('.progress-container').style.display = 'none';
        form.style.display = 'none';
        resultsScreen.classList.remove('hidden');
    }
    
    // Reset Form
    resetBtn.addEventListener('click', function() {
        // Clear all form fields
        form.reset();
        
        // Reset sliders and their feedback
        emotionalStabilityValue.textContent = '5';
        emotionalStabilityFeedback.textContent = 'Operationally manageable.';
        horninesslevelValue.textContent = '5';
        horninessFeedback.textContent = 'Standard operating levels.';
        
        // Hide results screen and show form
        document.querySelector('.form-header').style.display = 'block';
        document.querySelector('.disclaimer-banner').style.display = 'block';
        document.querySelector('.progress-container').style.display = 'block';
        form.style.display = 'block';
        resultsScreen.classList.add('hidden');
        
        // Reset progress bar
        document.querySelector('.progress-bar-fill').style.width = '0%';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Update progress bar on form changes (optional visual feedback)
    function updateProgressBar() {
        const fullName = document.getElementById('fullName').value;
        const age = document.getElementById('age').value;
        const rankStatus = document.getElementById('rankStatus').value;
        const intent = document.getElementById('intent').value;
        const fitnessLevel = document.getElementById('fitnessLevel').value;
        const conflictResolution = document.querySelector('input[name="conflictResolution"]:checked');
        const tacticalPosition = document.querySelector('input[name="tacticalPosition"]:checked');
        const certification = document.getElementById('certification').checked;
        
        let completedFields = 0;
        let totalFields = 9;
        
        if (fullName) completedFields++;
        if (age) completedFields++;
        if (rankStatus) completedFields++;
        if (intent) completedFields++;
        if (fitnessLevel) completedFields++;
        if (conflictResolution) completedFields++;
        if (tacticalPosition) completedFields++;
        if (certification) completedFields++;
        
        const progressPercentage = (completedFields / totalFields) * 100;
        document.querySelector('.progress-bar-fill').style.width = progressPercentage + '%';
    }
    
    // Listen to all form changes for progress bar
    form.addEventListener('change', updateProgressBar);
    form.addEventListener('input', updateProgressBar);
    
    // Initialize feedback text
    emotionalStabilityFeedback.textContent = 'Operationally manageable.';
    horninessFeedback.textContent = 'Standard operating levels.';
});
