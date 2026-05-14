const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const https = require('https');

const LARK_APP_ID = 'cli_a9700b3a7afd5cc3';
const LARK_APP_SECRET = '0KxX6BRI1s7AwGWwwZ0ebbPgtXwTz0Is';
const LARK_BASE_TOKEN = 'SqdAblVhpalBZCsucn9c2mU3nmS';
const LARK_TABLE_ID = 'tblhxjhTdsx0sUbr';

function getTenantToken() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ app_id: LARK_APP_ID, app_secret: LARK_APP_SECRET });
    const options = {
      hostname: 'open.feishu.cn',
      port: 443,
      path: '/open-apis/auth/v3/tenant_access_token/internal',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        const result = JSON.parse(body);
        if (result.code === 0) {
          resolve(result.tenant_access_token);
        } else {
          reject(new Error(result.msg));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function createOrUpdateRecord(token, fields, recordId = null) {
  return new Promise((resolve, reject) => {
    const url = `/open-apis/bitable/v1/apps/${LARK_BASE_TOKEN}/tables/${LARK_TABLE_ID}/records${recordId ? '/' + recordId : ''}`;
    const method = recordId ? 'PUT' : 'POST';
    const data = JSON.stringify({ fields });
    const options = {
      hostname: 'open.feishu.cn',
      port: 443,
      path: url,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Bearer ${token}`
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        const result = JSON.parse(body);
        if (result.code === 0) {
          resolve(result.data?.record?.record_id || recordId);
        } else {
          reject(new Error(result.msg));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function queryRecord(token, participantId) {
  return new Promise((resolve, reject) => {
    const filter = encodeURIComponent(`AND(CurrentValue.[参与者标识]="${participantId}")`);
    const url = `/open-apis/bitable/v1/apps/${LARK_BASE_TOKEN}/tables/${LARK_TABLE_ID}/records?filter=${filter}`;
    const options = {
      hostname: 'open.feishu.cn',
      port: 443,
      path: url,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        const result = JSON.parse(body);
        if (result.code === 0) {
          const records = result?.data?.items || [];
          resolve(records.length > 0 ? records[0].record_id : null);
        } else {
          reject(new Error(result.msg));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function getLocation(ip) {
  return new Promise((resolve) => {
    if (!ip || ip === '127.0.0.1' || ip.includes('::')) {
      resolve('未知地点');
      return;
    }
    http.get(`http://ip-api.com/json/${ip}?lang=zh-CN`, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          if (data.status === 'success') {
            resolve(`${data.country} ${data.regionName} ${data.city}`);
          } else {
            resolve('未知地点');
          }
        } catch (e) {
          resolve('未知地点');
        }
      });
    }).on('error', () => {
      resolve('未知地点');
    });
  });
}

exports.main = async (event, context) => {
  try {
    const { action, participant_id, platform, answers, completion_status, mbti_result, auth_method, nickname, email } = event;

    if (action !== 'upsert') {
      return { success: false, error: 'Unknown action' };
    }

    // 获取位置信息
    const ip = context.CLIENTIP || '';
    const location = await getLocation(ip);

    const token = await getTenantToken();

    const fields = {
      '参与者标识': participant_id,
      '来源平台': platform || '小程序',
      '回答数据': JSON.stringify(answers || {}),
      '完成状态': completion_status || '进行中',
      '授权方式': auth_method || '匿名',
      '所在地': location,
      'IP': ip
    };

    if (mbti_result) fields['MBTI结果'] = mbti_result;
    if (nickname) fields['昵称'] = nickname;
    if (email) fields['邮箱'] = email;

    const existingRecordId = await queryRecord(token, participant_id);

    let recordId;
    if (existingRecordId) {
      recordId = await createOrUpdateRecord(token, fields, existingRecordId);
    } else {
      recordId = await createOrUpdateRecord(token, fields);
    }

    return { success: true, record_id: recordId, action: existingRecordId ? 'update' : 'create' };
  } catch (err) {
    console.error('Cloud function error:', err);
    return { success: false, error: err.message };
  }
};
e, error: err.message };
  }
};
