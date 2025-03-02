export type RawTask = {
  task_id: string;
  created_at: string;
  completed_at?: string;
  type: string;
  status: string;
  instruction: string;
  params: {
    attachment: string;
    attachment_type: string;
    objects_to_annotate: string[];
    with_labels: boolean;
    min_width: number;
    min_height: number;
    examples: any[];
    annotation_attributes: {
      [key: string]: {
        description: string;
        choices: string[];
      };
    };
  };
  is_test: boolean;
  urgency: string;
  metadata: Record<string, any>;
  processed_attachments: any[];
  project: string;
  priority: number;
  postProcessingResults: Record<string, any>;
  customer_review_status?: string;
  customer_review_comments?: string[];
  callback_url?: string;
  callback_completed?: boolean;
  response: {
    annotations: Array<{
      label: string;
      attributes: Record<string, string>;
      uuid: string;
      width: number;
      height: number;
      geometry: string;
      left: number;
      top: number;
    }>;
    global_attributes: Record<string, any>;
    is_customer_fix: boolean;
  };
  customer_reviewed_by?: string;
  customer_audit_time_secs?: number;
  customer_audit_active_time_secs?: number;
  customer_audited_at?: string;
  audits?: Array<{
    audited_by: string;
    audited_at: string;
    audit_time_secs: number;
    audit_active_time_secs?: number;
    audit_result: string;
    audit_source: string;
  }>;
  projectId?: string;
  updated_at?: string;
  work_started?: boolean;
  isProcessed?: boolean;
};
