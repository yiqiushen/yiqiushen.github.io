import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Publication {
  title: string;
  year: string;
  authors: string;
  reference: string;
  abstract: string;
}

const publicationsData: Publication[] = [
  {
    title: "Minimax Supervised Clustering in the Anisotropic Gaussian Mixture Model",
    year: "2025",
    authors: "Minsker, Stanislav, Mohamed Ndaoud, and Shen, Yiqiu",
    reference: "Journal of Machine Learning Research. To appear",
    abstract: "We study the supervised clustering problem under the two-component anisotropic Gaussian mixture model in high dimensions and in the non-asymptotic setting. We first derive a lower and a matching upper bound for the minimax risk of clustering in this framework. We also show that in the high-dimensional regime, the linear discriminant analysis (LDA) classifier turns out to be sub-optimal in the minimax sense. Next, we characterize precisely the risk of ℓ2-regularized supervised least squares classifiers. We deduce the fact that the interpolating solution may outperform the regularized classifier, under mild assumptions on the covariance structure of the noise. Our analysis also shows that interpolation can be robust to corruption in the covariance of the noise when the signal is aligned with the \"clean\" part of the covariance, for the properly defined notion of alignment. To the best of our knowledge, this peculiar phenomenon has not yet been investigated in the rapidly growing literature related to interpolation. We conclude that interpolation is not only benign but can also be optimal, and in some cases robust."
  }, 
  {
    title: "The Impact of Contamination and Correlated Design on the Lasso",
    year: "2024",
    authors: "Minsker, Stanislav and Shen, Yiqiu",
    reference: "Probability and Statistics Letters. To appear",
    abstract: "We study the prediction problem in the context of the high-dimensional linear regression model. We focus on the practically relevant framework where a fraction of the linear measurements is corrupted while the columns of the design matrix can be moderately correlated. Our findings suggest that for most sparse signals, the Lasso estimator admits strong performance guarantees under more easily verifiable and less stringent assumptions on the design matrix compared to much of the existing literature."
  }, 
  {
    title: "Concentration and Moment Inequalities for Heavy-Tailed Random Matrices",
    year: "2024",
    authors: "Jirak, Moritz, Stanislav Minsker, Shen, Yiqiu, and Martin Wahl",
    reference: "Submitted to Probability and Related Fields. Minor revision",
    abstract: "We prove Fuk-Nagaev and Rosenthal-type inequalities for the sums of independent random matrices, focusing on the situation when the norms of the matrices possess finite moments of only low orders. Our bounds depend on the \"intrinsic\" dimensional characteristics such as the effective rank, as opposed to the dimension of the ambient space. We illustrate the advantages of such results in several applications, including new moment inequalities for sample covariance matrices and the corresponding eigenvectors of heavy-tailed random vectors. Moreover, we demonstrate that our techniques yield sharpened versions of the moment inequalities for empirical processes."
  }

];

const Publications: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Publications
      </Typography>
      {publicationsData.map((pub, index) => (
        <Accordion key={index} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`publication-content-${index}`}
            id={`publication-header-${index}`}
          >
            <Box>
              <Typography variant="h6">
                {pub.title} ({pub.year})
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {pub.authors}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {pub.reference}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                Abstract:
              </Typography>
              <Typography variant="body2">
                {pub.abstract}
              </Typography>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Publications;
