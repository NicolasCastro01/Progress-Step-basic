const progressBar = document.getElementById("progress");
const steps = document.querySelectorAll(".circle");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let clickCounter = 1;

nextButton.onclick = nextButtonActionOnClick;
prevButton.onclick = prevButtonActionOnClick;

function nextButtonActionOnClick() {
  clickCounter++;

  const clickCounterIsGreaterThanStepsLength = clickCounter > steps.length;

  if (clickCounterIsGreaterThanStepsLength) {
    clickCounter = steps.length;
  }

  updateStateFromSteps();
}

function prevButtonActionOnClick() {
  clickCounter--;

  if (clickCounter < 1) {
    clickCounter = 1;
  }

  updateStateFromSteps();
}

function updateStateFromSteps() {
  function stepIndexIsLessThanClickCounter(indexStep) {
    return indexStep < clickCounter;
  }

  steps.forEach((step, indexStep) => {
    const indexStepIsLessThanClickCounter =
      stepIndexIsLessThanClickCounter(indexStep);

    if (indexStepIsLessThanClickCounter) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  const stepActives = document.querySelectorAll(".active");
  const stepsLength = steps.length - 1;

  updateProgressBarWidth(stepActives, stepsLength);

  const isInitialStep = clickCounter === 1;
  const isFinalStep = clickCounter === steps.length;

  if (!isInitialStep && !isFinalStep) {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }

  if (isInitialStep) {
    prevButton.disabled = true;
  }

  if (isFinalStep) {
    nextButton.disabled = true;
  }
}

function updateProgressBarWidth(stepActives, stepsLength) {
  const stepActivesListLength = stepActives.length - 1;

  function calculatePercentageWidth() {
    const stepTotalLength = stepActivesListLength / stepsLength;

    return stepTotalLength * 100 + "%";
  }

  return (progressBar.style.width = calculatePercentageWidth());
}
