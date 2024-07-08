import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Opportunity.Amount',
    'Opportunity.CloseDate',
    'Opportunity.StageName',
    'Opportunity.NextStep',
    'Opportunity.Name',
    'Opportunity.Spiced_Situation__c',
    'Opportunity.spiced_situation_updated_timestamp__c',
    'Opportunity.spiced_situation_data_score__c',
    'Opportunity.spiced_situation_signal_score__c',
    'Opportunity.spiced_pain_updated_timestamp__c',
    'Opportunity.Spiced_Pain__c',
    'Opportunity.spiced_pain_data_score__c',
    'Opportunity.spiced_pain_signal_score__c',
    'Opportunity.spiced_impact_updated_timestamp__c',
    'Opportunity.Spiced_Impact__c',
    'Opportunity.spiced_impact_data_score__c',
    'Opportunity.spiced_impact_signal_score__c',
    'Opportunity.spiced_crit_event_updated_timestamp__c',
    'Opportunity.Spiced_Critical_Event__c',
    'Opportunity.spiced_crit_event_data_score__c',
    'Opportunity.spiced_crit_event_signal_score__c',
    'Opportunity.spiced_decision_proc_updated_timestamp__c',
    'Opportunity.Spiced_Decision_Criteria__c',
    'Opportunity.spiced_decision_proc_data_score__c',
    'Opportunity.spiced_decision_proc_signal_score__c',
    'Opportunity.spiced_competition_updated_timestamp__c',
    'Opportunity.Spiced_Competition__c',
    'Opportunity.spiced_competition_data_score__c',
    'Opportunity.spiced_competition_signal_score__c',
    'Opportunity.NA_EMEA__c',
    'Opportunity.Tool_Compatibility_Score__c',
    'Opportunity.fitscore_count_of_needs__c',
    'Opportunity.Primarily_Software__c',
    'Opportunity.spiced_unweighted_score__c',
    'Opportunity.SPICED_AI_Score_Date__c',
    'Opportunity.Economic_Buyer_Status__c',
    'Opportunity.champion_level_score__c',
    'Opportunity.spiced_champion_role_score__c',
    'Opportunity.spiced_weighted_score__c'
];

export default class OpportunityScorecard extends LightningElement {
    @api recordId; // This is the recordId of the Opportunity

    opportunityData = {};

    connectedCallback() {
        console.log('connectedCallback executed');
        console.log('Record ID:', this.recordId);
    }

    get opportunityDataString() {
        console.log('opportunityDataString getter called');
        return JSON.stringify(this.opportunityData, null, 2);
    }

    formatDate(dateString) {
        console.log('forematDate called with:', dateString);
        if (!dateString) {
            return 'N/A';
        }
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;
    }

    formatDateTime(dateString) {
        console.log('formatDateTime called with:', dateString);
        if (!dateString) {
            return 'N/A';
        }
        const date = new Date(dateString);
        const options = { 
            month: '2-digit', 
            day: '2-digit', 
            year: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        };
        return date.toLocaleString('en-US', options);
    }

    mapEconomicBuyerStatus(status) {
        switch (status) {
            case '1. Not Identified':
                return '0';
            case '2. Identified but Not Met/Engaged':
                return '1';
            case '3. Met and Unengaged':
                return '2';
            case '4. Met and Engaged':
                return '5';
            default:
                return 'N/A';
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredOpportunity({ error, data }) {
        console.log('wiredOpportunity invoked');
        if (data) {
            console.log('Data received from wire:', data);
            this.opportunityData = {
                amount: data.fields.Amount.value ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(data.fields.Amount.value) : 'N/A',
                closeDate: data.fields.CloseDate.value || 'N/A',
                stage: data.fields.StageName.value || 'N/A',
                nextStep: data.fields.NextStep.value || 'N/A',
                name: data.fields.Name.value || 'N/A',
                spicedSituation: data.fields.Spiced_Situation__c.value || 'N/A',
                spicedSituationUpdated: this.formatDate(data.fields.spiced_situation_updated_timestamp__c.value),
                spicedSituationDataScore: data.fields.spiced_situation_data_score__c.value ?? 'N/A',
                spicedSituationSignalScore: data.fields.spiced_situation_signal_score__c.value ?? 'N/A',
                spicedPainUpdated: this.formatDate(data.fields.spiced_pain_updated_timestamp__c.value),
                spicedPain: data.fields.Spiced_Pain__c.value || 'N/A',
                spicedPainDataScore: data.fields.spiced_pain_data_score__c.value ?? 'N/A',
                spicedPainSignalScore: data.fields.spiced_pain_signal_score__c.value ?? 'N/A',
                spicedImpactUpdated: this.formatDate(data.fields.spiced_impact_updated_timestamp__c.value),
                spicedImpact: data.fields.Spiced_Impact__c.value || 'N/A',
                spicedImpactDataScore: data.fields.spiced_impact_data_score__c.value ?? 'N/A',
                spicedImpactSignalScore: data.fields.spiced_impact_signal_score__c.value ?? 'N/A',
                spicedCritEventUpdated: this.formatDate(data.fields.spiced_crit_event_updated_timestamp__c.value),
                spicedCriticalEvent: data.fields.Spiced_Critical_Event__c.value || 'N/A',
                spicedCritEventDataScore: data.fields.spiced_crit_event_data_score__c.value ?? 'N/A',
                spicedCritEventSignalScore: data.fields.spiced_crit_event_signal_score__c.value ?? 'N/A',
                spicedDecisionProcUpdated: this.formatDate(data.fields.spiced_decision_proc_updated_timestamp__c.value),
                spicedDecisionCriteria: data.fields.Spiced_Decision_Criteria__c.value || 'N/A',
                spicedDecisionProcDataScore: data.fields.spiced_decision_proc_data_score__c.value ?? 'N/A',
                spicedDecisionProcSignalScore: data.fields.spiced_decision_proc_signal_score__c.value ?? 'N/A',
                spicedCompetitionUpdated: this.formatDate(data.fields.spiced_competition_updated_timestamp__c.value),
                spicedCompetition: data.fields.Spiced_Competition__c.value || 'N/A',
                spicedCompetitionDataScore: data.fields.spiced_competition_data_score__c.value ?? 'N/A',
                spicedCompetitionSignalScore: data.fields.spiced_competition_signal_score__c.value ?? 'N/A',
                NA_EMEA: data.fields.NA_EMEA__c.value === undefined ? 'N/A' : (data.fields.NA_EMEA__c.value ? 1 : 0),
                Tool_Compatibility_Score: data.fields.Tool_Compatibility_Score__c.value === 0 ? '0' : (data.fields.Tool_Compatibility_Score__c.value || 'N/A'),
                fitscore_count_of_needs: data.fields.fitscore_count_of_needs__c.value === 0 ? '0' : (data.fields.fitscore_count_of_needs__c.value || 'N/A'),
                Primarily_Software: data.fields.Primarily_Software__c.value === 0 ? '0' : (data.fields.Primarily_Software__c.value || 'N/A'),
                spiced_unweighted_score: data.fields.spiced_unweighted_score__c.value ?? 'N/A',
                scoreDate: this.formatDateTime(data.fields.SPICED_AI_Score_Date__c.value) || 'N/A',
                EconomicBuyerStatus: data.fields.Economic_Buyer_Status__c ? this.mapEconomicBuyerStatus(data.fields.Economic_Buyer_Status__c.value) : 'N/A',
                championLevelScore: data.fields.champion_level_score__c.value ?? 'N/A',
                championRoleScore: data.fields.spiced_champion_role_score__c.value ?? 'N/A',
                spiced_weighted_score: data.fields.spiced_weighted_score__c.value ?? 'N/A'
            };
            console.log('Formatted Opportunity Data:', this.opportunityData);
        } else if (error) {
            console.error('Error received from wire:', error);
        }
    }

    get naEmeaColorClass() {
        return this.opportunityData.NA_EMEA ? 'green' : 'red';
    }

    get situationDataScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedSituationDataScore);
    }

    get situationSignalScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedSituationSignalScore);
    }

    get painSignalScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedPainSignalScore);
    }
    
    get impactSignalScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedImpactSignalScore);
    }
        
    get competitionSignalScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedCompetitionSignalScore);
    }

    get situationDataScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedSituationDataScore);
    }
    
    get painDataScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedPainDataScore);
    }
    
    get impactDataScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedImpactDataScore);
    }
    
    get criticalEventDataScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedCritEventDataScore);
    }

    get criticalEventSignalScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedCritEventSignalScore);
    }
    
    get decisionCriteriaDataScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedDecisionProcDataScore);
    }

    get decisionCriteriaSignalScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedDecisionProcSignalScore);
    }
        
    get competitionDataScoreClass() {
        return this.getColorClassForFourPointScore(this.opportunityData.spicedCompetitionDataScore);
    }

    get toolCompatibilityColorClass() {
        const score = this.opportunityData.Tool_Compatibility_Score;
        if (score === null || score === '' || score === undefined) {
            return 'dark-red';
        } else if (score === 0) {
            return 'dark-yellow';
        } else if (score === 1) {
            return 'green';
        } else {
            return 'dark-red';
        }
    }  

    get EconomicBuyerStatusColorClass() {
        const score = this.opportunityData.EconomicBuyerStatus;

        if ( score == 'N/A' || score == null ) {
            return 'dark-red';
        }
        else if (score == 0) {
            return 'red';
        }
        else if (score == 1) {
            return 'dark-yellow';    
        }
        else if (score == 2) {
            return 'dark-yellow';
        }
        else if (score == 5) {
            return 'green';
        }
    }   

    get championLevelScoreColorClass() {
        const score = this.opportunityData.championLevelScore;
    
        if (score == 'N/A' || score == null) {
            return 'dark-red';
        } else if (score == 0) {
            return 'dark-red';
        } else if (score == 1 || score == 2) {
            return 'dark-yellow';
        } else if (score == 5) {
            return 'green';
        }
    }
    

    get primarilySoftwareColorClass () {
        const score = this.opportunityData.Primarily_Software;

        if ( score == 'N/A' || score == null ) {
            return 'dark-red';
        }
        else if (score == 0) {
            return 'dark-yellow';
        }
        else if (score == 1)
        {
            return 'green';    
        }
        else {
            return 'dark-red';
        }
    }

    get fitScoreColorClass() {
        const score = this.opportunityData.fitscore_count_of_needs;
        if (score =='N/A' || score == 0) {
            return 'dark-red';
        } else if (score == 1) {
            return 'dark-yellow';
        } else if (score > 1) {
            return 'green';
        }
    }

    get championRoleTypeColorClass() {
        const score = this.opportunityData.championRoleScore;
        console.log()
        if (score == 'N/A' || score == null || score == 0) {
            return 'dark-red';
        } else if (score == 3) {
            return 'dark-yellow';
        } else if (score == 4) {
            return 'dark-yellow';
        } else if (score == 5) {
            return 'green';
        } else {
            return 'dark-red';
        }
    }
    
    getColorClassForFourPointScore(score) {
        if (score === 1) {
            return 'red';
        } else if (score === 2 || score === 3) {
            return 'dark-yellow';
        } else if (score === 4) {
            return 'green';
        } else if (score === 'N/A' || score == null) {
            return 'dark-red';
        } else {
            return '';
        }
    }
}

console.log('OpportunityScorecard component finished loading');
