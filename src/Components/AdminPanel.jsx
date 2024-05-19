import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/transactions">View All Transactions</Link></li>
        <li><Link to="/admin/bank_accounts">View All Bank Accounts</Link></li>
        <li><Link to="/admin/users">View All Users</Link></li>
        <li><Link to="/admin/talks">View All Talks</Link></li>
        {/* Добавьте здесь дополнительные ссылки для других методов администратора */}
      </ul>
    </div>
  );
};

export default AdminPanel;
